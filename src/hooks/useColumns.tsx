import { ColumnsType } from 'antd/lib/table';
import React, { useCallback, useMemo, useState } from 'react';
import { UserSet } from '@components/UserSet';
import {
  Button, DateFormat, ScriptStatusFormat,
} from '@ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileVideo } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import {
  IScriptData, ScriptStatus, IReaderShort,
} from '@entities';

export const usePagination = (initialPage = 0): [
  number,
  React.Dispatch<React.SetStateAction<number>>,
] => {
  const [pagination, setPagination] = useState<number>(initialPage);
  return [
    pagination,
    setPagination,
  ];
};

export const useTableTranslation = () => {
  const { t } = useTranslation();
  return useCallback((key: string) => t(`table.${key}`), [t]);
};

export const useUploadDateColumns = (): ColumnsType<IScriptData> => {
  const t = useTableTranslation();
  return useMemo<ColumnsType<IScriptData>>(() => [
    {
      title: t('upload-date'),
      dataIndex: 'uploadDate',
      render: (date: string) => <DateFormat value={date} />,
    },
  ], [t]);
};

export const useAssignedDateColumns = (): ColumnsType<IScriptData> => {
  const t = useTableTranslation();
  return useMemo<ColumnsType<IScriptData>>(() => [
    {
      title: t('assigned-date'),
      dataIndex: 'assignedDate',
      render: (date: string) => <DateFormat value={date} />,
    },
  ], [t]);
};

export const useBasicColumns = (): ColumnsType<IScriptData> => {
  const t = useTableTranslation();
  return useMemo<ColumnsType<IScriptData>>(() => [
    {
      title: t('name'),
      dataIndex: 'scriptName',
    },
    {
      title: t('author'),
      dataIndex: 'scriptAuthor',
    },
    {
      title: t('status'),
      dataIndex: 'scriptStatus',
      render: (value: ScriptStatus) => <ScriptStatusFormat value={value} />,
    },
  ], [t]);
};

export const useReviewersColumns = (page: number): ColumnsType<IScriptData> => {
  const t = useTableTranslation();
  return useMemo(() => [
    {
      title: t('readers'),
      dataIndex: 'readers',
      key: 'reviewers',
      className: 'reviewers',
      render: (assignedReviewers: IReaderShort[], record: IScriptData): JSX.Element => (
        <UserSet
          assignedReviewers={assignedReviewers}
          record={record}
          page={page}
        />
      ),
    },
  ], [page, t]);
};

export const useGotoActionColumns = (
  onAction: (scriptId: number) => void,
): ColumnsType<IScriptData> => {
  const t = useTableTranslation();
  return useMemo(() => [
    {
      title: t('action'),
      dataIndex: 'id',
      key: 'id',
      render: (id: number) => (
        <Button
          variant="text"
          disabledType="gray"
          size="small"
          onClick={() => onAction(id)}
        >
          <FontAwesomeIcon icon={faFileVideo} color="black" />
        </Button>
      ),
    },
  ], [onAction, t]);
};
