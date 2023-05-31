import { useSuspenseQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { CountriesQuery } from '../gql/graphql';
import query from './index.query.graphql';
import './index.scss';

export const RouteComponent = () => {
  const { data } = useSuspenseQuery<CountriesQuery>(query);

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
