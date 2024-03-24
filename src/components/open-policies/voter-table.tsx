import { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTable, usePagination } from 'react-table';
import cn from 'classnames';
import Button from '@/components/ui/button';
import { LongArrowRight } from '@/components/icons/long-arrow-right';
import { LongArrowLeft } from '@/components/icons/long-arrow-left';
import { ExportIcon } from '@/components/icons/export-icon';

const COLUMNS = [
  {
    Header: 'Voter',
    accessor: 'voter',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <a
        href={value.link}
        className="inline-flex items-center gap-2 hover:underline hover:opacity-90 focus:underline focus:opacity-90"
      >
        {value.id}
        <ExportIcon className="h-auto w-3" />
      </a>
    ),
  },
  {
    Header: 'Voting weight',
    accessor: 'voting_weight',
  },
  {
    Header: 'Decision',
    accessor: 'status',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div
        className={cn(
          'text-[13px] uppercase sm:text-right sm:text-inherit',
          value.toLowerCase() === 'accepted'
            ? 'text-green-600'
            : 'text-red-600'
        )}
      >
        {value}
      </div>
    ),
  },
];

interface VoterTableTypes {
  votes: {
    voter: {
      id: string;
      link: string;
    };
    voting_weight: number;
    status: string[];
  }[];
}

export default function VoterTable({ votes }: VoterTableTypes) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = useMemo(() => votes, []);
  const columns = useMemo(() => COLUMNS, []);
  const {
    getTableProps,
    getTableBodyProps,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    headerGroups,
    page,
    nextPage,
    setPageSize,
    previousPage,
    prepareRow,
  } = useTable(
    {
      // @ts-ignore
      columns,
      data,
    },
    usePagination
  ) as any;
  let { pageIndex } = state;
  useEffect(() => {
    setPageSize(5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <motion.div
      layout
      className="mb-4 border-b border-dashed border-gray-700 px-4 pb-6"
    >
      <table
        {...getTableProps()}
        className="w-full border-separate border-0 sm:pb-2"
      >
        <thead className="hidden sm:table-header-group">
          {headerGroups.map((headerGroup: any, idx: any) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
              {headerGroup.headers.map((column: any, idx: any) => (
                <th
                  {...column.getHeaderProps()}
                  key={idx}
                  className={cn(
                    'pb-2 font-normal text-gray-300',
                    column.id === 'status' ? 'text-right' : 'text-left',
                    column.id === 'voting_weight' && 'w-2/5'
                  )}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="text-sm text-gray-100">
          {page.map((row: any, idx: any) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={idx}
                className="mb-3 grid border-b border-gray-700 pb-3 sm:mb-0 sm:table-row sm:border-b-0 sm:pb-0"
              >
                {row.cells.map((cell: any, idx: any) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={idx}
                      className="px-0 py-1 sm:py-2"
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex w-full items-center justify-center text-sm xs:justify-end sm:mt-3">
        <div className="flex items-center gap-4">
          <Button
            size="mini"
            shape="rounded"
            variant="transparent"
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          >
            <LongArrowLeft className="h-auto w-4" />
          </Button>
          <div className="uppercase text-gray-100">
            Page {pageIndex + 1}{' '}
            <span className="text-gray-400">of {pageOptions.length}</span>
          </div>
          <Button
            size="mini"
            shape="rounded"
            variant="transparent"
            disabled={!canNextPage}
            onClick={() => nextPage()}
          >
            <LongArrowRight className="h-auto w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
