'use client'

import { updateNTValue } from "@/lib/redux/networkTablesSlice";
import store from "@/lib/redux/store";
import { AnnounceMessageParams, NetworkTables, NetworkTablesTypeInfo, NetworkTablesTypeInfos, NetworkTablesTypes } from "ntcore-ts-client"

// const data: Record<string, NetworkTablesTypes | null> = {}

export async function getClient() {
    // const client = NetworkTables.getInstanceByTeam(131, 5810); // Robot
    const client = NetworkTables.getInstanceByURI('localhost'); // Simulator

    // pipe into the 'onAnnounce' function so we can create the topics before the PubSubClient get the message
    const socket: any = client.client.messenger.socket;
    const originalOnAnnounce = socket.onAnnounce;
    socket.onAnnounce = (params: AnnounceMessageParams) => {
        // console.log(`New topic announced: ${params.name}`);
        const topic = client.createTopic(params.name, params.type as unknown as NetworkTablesTypeInfo);
        originalOnAnnounce(params);
        topic.subscribe(value => {
            store.dispatch(updateNTValue({topicName: topic.name, value}))
            // data[topic.name] = value;
        }, true);
    }

    // subscribe to all topic announcements
    const allTopicsTrigger = client.createTopic("", NetworkTablesTypeInfos.kString);
    allTopicsTrigger.subscribe(m => console.log(m), true, {prefix: true, topicsonly: true});
    return client;
}
