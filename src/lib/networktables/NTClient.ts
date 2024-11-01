'use client'

import { addNTEntry, updateConnected, updateNTValue } from "@/lib/redux/networkTablesSlice";
import store from "@/lib/redux/store";
import { AnnounceMessageParams, NetworkTables, NetworkTablesTypeInfo, NetworkTablesTypeInfos, NetworkTablesTypes,  } from "ntcore-ts-client"

let _client: NetworkTables;
const startClient = async () => {
    // const client = NetworkTables.getInstanceByTeam(131, 5810); // Robot
    const client = NetworkTables.getInstanceByURI('localhost'); // Simulator

    // pipe into the 'onAnnounce' function so we can create the topics before the PubSubClient get the message
    const socket: any = client.client.messenger.socket;
    const originalOnAnnounce = socket.onAnnounce;
    socket.onAnnounce = (params: AnnounceMessageParams) => {
        // console.log(`New topic announced: ${params.name}`);
        const topic = client.createTopic(params.name, params.type as unknown as NetworkTablesTypeInfo); // TODO: type is wrong
        store.dispatch(addNTEntry({topicName: params.name, type: params.type}));
        originalOnAnnounce(params);
        topic.subscribe(value => {
            store.dispatch(updateNTValue({topicName: topic.name, value}));
            // data[topic.name] = value;
        }, true);
    }

    client.addRobotConnectionListener(isConnected => store.dispatch(updateConnected({isConnected})));

    // subscribe to all topic announcements
    const allTopicsTrigger = client.createTopic("", NetworkTablesTypeInfos.kString);
    allTopicsTrigger.subscribe(m => console.log(m), true, {prefix: true, topicsonly: true});
    return client;
};

export async function getClient() {
    if (!_client) {
        _client = await startClient();
    }
    return _client;
}
