import { FC } from 'react';

interface Props {
  data: string[][];
}

export const TechSpecsTable: FC<Props> = ({ data }) => (
  <table className="w-full border-spacing-x-8">
    <tbody>
      {data.map(([key, value]) => {
        const header = key[0].toLocaleUpperCase() + key.slice(1);

        return (
          <tr key={key}>
            <th scope="row" className="text-start text-body text-secondary">
              {header}
            </th>
            <td className="text-end">{value}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
