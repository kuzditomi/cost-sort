import { useEffect, useState } from "react";

// https://github.com/fawazahmed0/exchange-api
// https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json
export function useCurrency() {
    const [isLoading, setLoading] = useState(true);
    const [currenciesToEur, setCurrencyList] = useState({} as Record<string, number>);

    useEffect(() => {
        (async function () {
            const prices = await fetch(
                "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json"
            );
            const value = await prices.json() as { eur: Record<string, number> };

            setCurrencyList(value.eur);
            setLoading(false);
        })();
    }, []);

    return {
        isLoading,
        currenciesToEur,
    };
}
