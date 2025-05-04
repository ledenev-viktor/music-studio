import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { TeamFieldsWithId, TeamList } from '~features/team';
import { Spin, Title } from '~shared/ui';
import s from './TeamWidget.module.scss';
import { useGetTeam } from '~shared/hooks/team/useGetTeam';

export const TeamWidget = () => {
    const { locale } = useRouter();
    const { data: teamData, isLoading } = useGetTeam();

    const localeKey = (locale ? locale : 'en') as LanguageKey;

    console.log('teamData', teamData);

    const items = useMemo(
        () =>
            teamData?.reduce<TeamFieldsWithId[]>((acc, item) => {
                const img = item?.[localeKey].img;
                const name = item?.[localeKey].name;
                const desc = item?.[localeKey].desc;
                const active = item?.[localeKey].active;
                const chief = item?.[localeKey].chief;

                if (!img || img.trim() === '') return acc;

                acc.push({
                    id: item.id,
                    name,
                    desc,
                    active,
                    img,
                    chief,
                });

                return acc;
            }, []),
        [teamData, localeKey],
    );

    if (isLoading) return <Spin />;

    if (!items?.length) return null;

    return (
        <div className={s.wrapper}>
            <Title>Наша команда</Title>
            <TeamList items={items} />
        </div>
    );
};
