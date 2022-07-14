import {BehaviorSubject} from "rxjs";
import React, {useEffect, useState} from "react";

const withBehaviourSubject = <Props, State, Actions extends { [T in string]: { (...args: any[]): any } }>(
    context$: BehaviorSubject<State>,
    actions: Actions,
): (Component: React.ComponentType<Props & State & Actions>) => React.ComponentType<Props> => {
    return Component => (props: Props) => {
        const [state, setState] = useState<State>(context$.getValue());
        let isMounted = {status: true};

        // Подписываемся на изменения
        useEffect(() => {
            const subscription = context$.subscribe({
                next: value => {
                    if (!isMounted.status) {
                        return
                    }

                    setState(value)
                },
            });

            return () => {
                isMounted.status = false;
                subscription.unsubscribe();
            }
        }, []);

        return <Component {...props} {...state} {...actions} />
    }
};

export default withBehaviourSubject
