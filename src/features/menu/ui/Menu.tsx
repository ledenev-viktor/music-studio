import { useState } from 'react';
import { MenuToggle } from './MenuToggle';
import { MenuContent } from './MenuContent';
import { useMenuAnimation } from '~features/menu/hooks/useMenuAnimation';

export const Menu = ({ classNameToggle }: { classNameToggle?: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const scope = useMenuAnimation(isOpen);

    return (
        <div ref={scope}>
            <MenuContent toggle={() => setIsOpen(!isOpen)} />
            <MenuToggle
                classNameToggle={classNameToggle}
                toggle={() => setIsOpen(!isOpen)}
            />
        </div>
    );
};
