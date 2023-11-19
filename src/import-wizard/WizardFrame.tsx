import { PropsWithChildren } from "react";

export const WizardFrame: React.FC<
    PropsWithChildren<{
        onNext?: () => void;
        nextDisabled?: boolean;
        onPrev?: () => void;
    }>
> = ({ children, onNext, nextDisabled, onPrev }) => {
    return (
        <div>
            <div>{children}</div>
            <div>
                {onPrev ? (
                    <button className="prev" onClick={onPrev}>
                        Prev
                    </button>
                ) : null}
                {onNext ? (
                    <button disabled={nextDisabled} className="next" onClick={onNext}>
                        Next
                    </button>
                ) : null}
            </div>
        </div>
    );
};
