import { Col, Select } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field, useField } from 'react-final-form';
import useCampuses from '../../api/queries/useCampuses';
import useInstitutions from '../../api/queries/useInstitutions';
import useLibraries from '../../api/queries/useLibraries';
import useLocations from '../../api/queries/useLocations';
import { FormattedMessage } from 'react-intl';

export default function CriteriaLocation({ prefix }: { prefix: string }) {
  const institutions = useInstitutions();
  const campuses = useCampuses();
  const libraries = useLibraries();
  const locations = useLocations();

  const selectedInstitution = useField<string | undefined>(
    `${prefix}institutionId`,
    {
      subscription: { value: true },
    }
  ).input.value;
  const selectedCampus = useField<string | undefined>(`${prefix}campusId`, {
    subscription: { value: true },
  }).input.value;
  const selectedLibrary = useField<string | undefined>(`${prefix}libraryId`, {
    subscription: { value: true },
  }).input.value;

  const institutionSelectOptions = useMemo(() => {
    if (!institutions.isSuccess) {
      return [];
    }

    return institutions.data.map((institution) => ({
      label: institution.name,
      value: institution.id,
    }));
  }, [institutions]);

  const campusSelectOptions = useMemo(() => {
    if (!selectedInstitution || !campuses.isSuccess) {
      return [];
    }

    return campuses.data
      .filter((campus) => campus.institutionId === selectedInstitution)
      .map((campus) => ({
        label: campus.name,
        value: campus.id,
      }));
  }, [selectedInstitution, campuses]);

  const librarySelectOptions = useMemo(() => {
    if (!selectedCampus || !libraries.isSuccess) {
      return [];
    }

    return libraries.data
      .filter((library) => library.campusId === selectedCampus)
      .map((library) => ({
        label: library.name,
        value: library.id,
      }));
  }, [selectedCampus, libraries]);

  const locationSelectOptions = useMemo(() => {
    if (!selectedLibrary || !locations.isSuccess) {
      return [];
    }

    return locations.data
      .filter((location) => location.libraryId === selectedLibrary)
      .map((location) => ({
        label: location.name,
        value: location.id,
      }));
  }, [selectedLibrary, locations]);

  return (
    <>
      <Col xs={12} md={6}>
        <Field name={`${prefix}institutionId`}>
          {(fieldProps) => (
            <Select<string | undefined>
              {...fieldProps}
              fullWidth
              marginBottom0
              required
              label={
                <FormattedMessage id="ui-plugin-bursar-export.bursarExports.criteria.location.inst" />
              }
              dataOptions={[
                { label: '', value: undefined },
                ...institutionSelectOptions,
              ].sort((a, b) => a.label.localeCompare(b.label))}
            />
          )}
        </Field>
      </Col>
      <Col xs={12} md={6}>
        <Field name={`${prefix}campusId`}>
          {(fieldProps) => (
            <Select<string | undefined>
              {...fieldProps}
              fullWidth
              marginBottom0
              required
              label={
                <FormattedMessage id="ui-plugin-bursar-export.bursarExports.criteria.location.camp" />
              }
              dataOptions={[
                { label: '', value: undefined },
                ...campusSelectOptions,
              ].sort((a, b) => a.label.localeCompare(b.label))}
            />
          )}
        </Field>
      </Col>
      <Col xs={12} md={6}>
        <Field name={`${prefix}libraryId`}>
          {(fieldProps) => (
            <Select<string | undefined>
              {...fieldProps}
              fullWidth
              marginBottom0
              required
              label={
                <FormattedMessage id="ui-plugin-bursar-export.bursarExports.criteria.location.lib" />
              }
              dataOptions={[
                { label: '', value: undefined },
                ...librarySelectOptions,
              ].sort((a, b) => a.label.localeCompare(b.label))}
            />
          )}
        </Field>
      </Col>
      <Col xs={12} md={6}>
        <Field name={`${prefix}locationId`}>
          {(fieldProps) => (
            <Select<string | undefined>
              {...fieldProps}
              fullWidth
              marginBottom0
              required
              label={
                <FormattedMessage id="ui-plugin-bursar-export.bursarExports.criteria.location.loc" />
              }
              dataOptions={[
                { label: '', value: undefined },
                ...locationSelectOptions,
              ].sort((a, b) => a.label.localeCompare(b.label))}
            />
          )}
        </Field>
      </Col>
    </>
  );
}
