"use client";
import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  Layout,
  AppBar,
  TitlePortal,
} from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import React from "react";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const MyAppBar = () => (
  <AppBar sx={{
        color: '#2C40EA',
        '& .RaAppBar-toolbar': { padding: 0 },
    }}>
    <div>layout</div>
  </AppBar>
);

const MyLayout = (props: any) => <Layout {...props} appBar={MyAppBar} />;

const AdminApp = () => (
  <Admin dataProvider={dataProvider} layout={MyLayout}>
    <Resource
      name="users"
      list={ListGuesser}
      edit={EditGuesser}
      recordRepresentation="name"
    />
  </Admin>
);

export default AdminApp;
