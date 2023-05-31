import Error from './Error';
import { gql, useSuspenseQuery } from '@apollo/client';
import './Countries.scss';

interface CountriesQuery {
  countries: { name: string; code: string }[];
}

const QUERY = gql`
  query CountriesQuery {
    countries {
      name
      code
    }
  }
`;

const Countries = () => {
  const { data, error } = useSuspenseQuery<CountriesQuery>(QUERY);

  if (error) {
    return <Error title="Something went wrong" message={error.message} />;
  }

  return (
    <ul className="Countries">
      {data.countries.map((country) => (
        <li className="Countries-country" key={country.code}>
          {country.code} - {country.name}
        </li>
      ))}
    </ul>
  );
};

export default Countries;
