import { useGetEvents } from '~hooks';

export default function InitialPage() {
    const { data } = useGetEvents();

    return <div>{JSON.stringify(data)}</div>;
}
