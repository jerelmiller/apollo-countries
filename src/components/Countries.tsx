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
  const { data } = useSuspenseQuery<CountriesQuery>(QUERY);

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
