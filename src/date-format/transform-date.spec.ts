import { transformDate } from "./transform-date";

test.each([["20201210", "yyyyMMdd", "yyyy.MM.dd.", "2020.12.10."]])(
    "Correct inputs: date %s with input %s and output %s becomes %s",
    (date, inputFormat, outputFormat, expectedDate) => {
        expect(transformDate(date, inputFormat, outputFormat)).toEqual(expectedDate);
    }
);

test("invalid input format results in original date", () => {
    const invalidInputFormat = "abc";

    expect(transformDate("202012", invalidInputFormat, "yyyy.MM.dd.")).toEqual("202012");
});
