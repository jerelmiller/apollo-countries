import { useSuspenseQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import query from './[code].query.graphql';

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

export const RouteComponent = () => {
  const { code } = useParams() as { code: string };
  const { data } = useSuspenseQuery<CountryQuery, CountryQueryVariables>(
    query,
    { variables: { code } }
  );

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
