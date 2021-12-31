import { gql } from "@apollo/client";

export const EXAMPLE_QUERY = gql`
    query Example($number: Int!) {
        hello(n: $number)
    }
`;
