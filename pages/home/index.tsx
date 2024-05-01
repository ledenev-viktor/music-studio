import { useGetDummy } from '~hooks/dummy';

export default function HomePage() {
    const { data } = useGetDummy();
    return <div>{JSON.stringify(data)}</div>;
}
