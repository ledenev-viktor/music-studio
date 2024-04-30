import dynamic from "next/dynamic";

const AdminAppDynamic = dynamic(() => import("./component-app"), {
  ssr: false,
});

export default function Admin() {
  return <AdminAppDynamic />;
}
