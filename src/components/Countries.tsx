import useQuery from '../hooks/useQuery';
import graphql from '../graphql';
import './Countries.scss';

interface CountriesQuery {
  countries: { name: string; code: string }[];
}

const QUERY = graphql`
  query CountriesQuery {
    countries {
      name
      code
    }
  }
`;

const Countries = () => {
  const { data, error, status } = useQuery<CountriesQuery>(QUERY);

  if (status === useQuery.STATUS.LOADING) {
    return <div>Loading</div>;
  }

  if (status === useQuery.STATUS.ERROR) {
    return <div>{error.message}</div>;
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
