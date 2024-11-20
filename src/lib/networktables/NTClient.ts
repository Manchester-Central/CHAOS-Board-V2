'use client'

import { addNTEntry, updateConnected, updateNTValue } from "@/lib/redux/networkTablesSlice";
import store from "@/lib/redux/store";
import { NetworkTables } from "ntcore-ts-client";

let _client: NetworkTables;
const startClient = async () => {
    // const client = NetworkTables.getInstanceByTeam(131, 5810); // Robot
    const client = NetworkTables.getInstanceByURI('localhost'); // Simulator

    const allTopics = client.createPrefixTopic('/');
    allTopics.subscribe((value, params) => {
        const topicName = params.name;
        const entryExistsAlready = !!store.getState().nt.data[topicName];
        if (!entryExistsAlready) {
            store.dispatch(addNTEntry({topicName, type: params.type}))
        }
        store.dispatch(updateNTValue({topicName, value}));
    });

    client.addRobotConnectionListener(isConnected => store.dispatch(updateConnected({isConnected})));

    return client;
};

export async function getClient() {
    if (!_client) {
        _client = await startClient();
    }
    return _client;
}
