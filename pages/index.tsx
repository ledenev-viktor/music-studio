import { useGetEvents } from '~hooks';

export default function InitialPage() {
    const { data: events } = useGetEvents();

    return (
        <div>
            <h1>Events</h1>
            <div>{JSON.stringify(events) || 'empty'}</div>
        </div>
    );
}
