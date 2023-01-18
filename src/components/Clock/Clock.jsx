import styles from './Clock.module.css';
import cn from 'classnames';
import { useMemo } from 'react';

const hours = new Array(12)
    .fill(0)
    .map((_, index) => index + 1)
    .map((hour) => ({ hour, deg: hour * 30 }));

const points = new Array(60)
    .fill(0)
    .map((_, index) => index + 1)
    .map((minute) => ({ minute, deg: minute * 6 }));

const Dots = () => {
    return points.map(({ deg }) =>  <div style={{transform: `rotate(${deg}deg)`}} className={styles.point} >.</div>);
};

const Hours = () => {
    return hours.map(({ hour, deg }) =>
        <div className={styles.number} style={{transform: `rotate(${deg}deg)`}}>
            <div style={{transform: `rotate(${-deg}deg)`}}>{hour}</div>
        </div>
    );
};

const Arrow = ({className, ...props}) => <div className={cn(styles.arrow, className)} {...props}/>;

export const Clock = ({date}) => {
    const {arrowSec, arrowMin, arrowHour} = useMemo(() => {
        const degPerMillisec = (date.getMilliseconds() * 6) / 1000;
        const degPerSec = date.getSeconds() * 6 + degPerMillisec;
        const degPerMin = ((date.getMinutes() / 10) * 60 + degPerSec / 60).toFixed(1);
        const degPerHour = ((date.getHours() % 12) * 30 + degPerMin / 60).toFixed(1);

        return {
            arrowSec: {transform: `rotate(${degPerSec}deg)`},
            arrowMin: {transform: `rotate(${degPerMin}deg)`},
            arrowHour: {transform: `rotate(${degPerHour}deg)`},
        };
    }, [date]);

    return (
        <div className={styles.clock}>
            <Arrow style={arrowHour} className={styles.arrowHour} />
            <Arrow style={arrowMin} className={styles.arrowMin} />
            <Arrow style={arrowSec} className={styles.arrowSec} />
            <Dots />
            <Hours />
        </div>
    );
};