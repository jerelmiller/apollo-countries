import { gql, TypedDocumentNode, useSuspenseQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';

interface CountryQuery {
  country: {
    code: string;
    name: string;
    capital: string;
    continent: {
      code: string;
      name: string;
    };
  };
}

interface CountryQueryVariables {
  code: string;
}

const QUERY: TypedDocumentNode<CountryQuery, CountryQueryVariables> = gql`
  query CountryQuery($code: ID!) {
    country(code: $code) {
      code
      name
      capital
      continent {
        code
        name
      }
    }
  }
`;

export const RouteComponent = () => {
  const { code } = useParams() as { code: string };
  const { data } = useSuspenseQuery(QUERY, { variables: { code } });

  const { country } = data;

  return (
    <>
      <header>
        <Link to="/">&larr; Back</Link>
      </header>
      <h1>{country.name}</h1>
      <dl>
        <dt>Capital</dt>
        <dd>{country.capital}</dd>

        <dt>Continent</dt>
        <dd>{country.continent.name}</dd>
      </dl>
    </>
  );
};
