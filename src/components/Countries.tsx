import useQuery from '../hooks/useQuery';
import graphql from '../graphql';

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
    <ul>
      {data.countries.map((country) => (
        <li key={country.code}>
          {country.code} - {country.name}
        </li>
      ))}
    </ul>
  );
};

export default Countries;
