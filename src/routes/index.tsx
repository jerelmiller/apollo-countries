import { gql, useSuspenseQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
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
          <Link to={`countries/${country.code}`}>
            {country.code} - {country.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
