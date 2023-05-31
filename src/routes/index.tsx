import { gql, useSuspenseQuery } from '@apollo/client';
import './index.scss';

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

export const RouteComponent = () => {
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
