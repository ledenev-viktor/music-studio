import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

// needs to be default import for dynamic loading
export default function AdminApp() {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource
                name="users"
                list={ListGuesser}
                edit={EditGuesser}
                recordRepresentation="name"
            />
        </Admin>
    );
}
