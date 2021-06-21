import React from 'react';

export const CustomBadge: React.FC<{ txt: React.ReactNode; count: number; collapsed: boolean }> = ({
    txt,
    count,
    collapsed,
}) => {
    React.useEffect(() => {
        localStorage.setItem('countNotifications', String(count));
    }, [count]);

    if (count === 0) {
        return <>{txt}</>;
    }

    // небольшой костыль чтобы адекватно отображалось badge
    const el: any = document.getElementById('unicalniyId31')?.nextSibling?.firstChild;
    if (typeof el === 'object') {
        if (collapsed) {
            el.style.fontSize = '0px';
        } else {
            el.style.fontSize = '14px';
        }
    }

    return (
        <span id="unicalniyId31" className="CustomBadge">
            <span className="CustomBadge__txt">{txt}</span>
            <span className="CustomBadge__count">{count > 99 ? '99+' : count}</span>
        </span>
    );
};
