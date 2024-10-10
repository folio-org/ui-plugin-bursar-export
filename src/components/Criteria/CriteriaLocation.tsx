import { Col, Select, Label } from '@folio/stripes/components';
import React, { useMemo } from 'react';
import { Field, useField } from 'react-final-form';
import { useIntl } from 'react-intl';
import { useCampuses, useInstitutions, useLibraries, useLocations } from '../../api/queries';

export default function CriteriaLocation({ prefix }: Readonly<{ prefix: string }>) {
  const institutions = useInstitutions();
  const campuses = useCampuses();
  const libraries = useLibraries();
  const locations = useLocations();
  const intl = useIntl();

  const selectedInstitution = useField<string | undefined>(`${prefix}institutionId`, {
    subscription: { value: true },
  }).input.value;
  const selectedCampus = useField<string | undefined>(`${prefix}campusId`, {
    subscription: { value: true },
  }).input.value;
  const selectedLibrary = useField<string | undefined>(`${prefix}libraryId`, {
    subscription: { value: true },
  }).input.value;
  const selectedLocation = useField<string | undefined>(`${prefix}locationId`, {
    subscription: { value: true },
  }).input.value;

  const institutionSelectOptions = useMemo(() => {
    if (!institutions.isSuccess) {
      return [{ label: '', value: undefined }];
    }

    return [
      { label: '', value: undefined },
      ...institutions.data
        .map((institution) => ({
          label: institution.name,
          value: institution.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ];
  }, [institutions]);

  const campusSelectOptions = useMemo(() => {
    if (!selectedInstitution || !campuses.isSuccess) {
      return [{ label: '', value: undefined }];
    }

    return [
      { label: '', value: undefined },
      ...campuses.data
        .filter((campus) => campus.institutionId === selectedInstitution)
        .map((campus) => ({
          label: campus.name,
          value: campus.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ];
  }, [selectedInstitution, campuses]);

  const librarySelectOptions = useMemo(() => {
    if (!selectedCampus || !libraries.isSuccess) {
      return [{ label: '', value: undefined }];
    }

    return [
      { label: '', value: undefined },
      ...libraries.data
        .filter((library) => library.campusId === selectedCampus)
        .map((library) => ({
          label: library.name,
          value: library.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ];
  }, [selectedCampus, libraries]);

  const locationSelectOptions = useMemo(() => {
    if (!selectedLibrary || !locations.isSuccess) {
      return [{ label: '', value: undefined }];
    }

    return [
      { label: '', value: undefined },
      ...locations.data
        .filter((location) => location.libraryId === selectedLibrary)
        .map((location) => ({
          label: location.name,
          value: location.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ];
  }, [selectedLibrary, locations]);

  const institutionName = institutionSelectOptions.find((inst) => inst.value === selectedInstitution)?.label;
  const campusName = campusSelectOptions.find((camp) => camp.value === selectedCampus)?.label;
  const libraryName = librarySelectOptions.find((lib) => lib.value === selectedLibrary)?.label;
  const locationName = locationSelectOptions.find((loc) => loc.value === selectedLocation)?.label;

  return (
    <>
      <Col xs={12} md={6}>
        <Label required>
          {intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.criteria.location.inst' })}
        </Label>
        <Field name={`${prefix}institutionId`}>
          {(fieldProps) => (
            <Select<string | undefined>
              {...fieldProps}
              fullWidth
              marginBottom0
              required
              aria-label={institutionName === undefined ? 'Institution' : institutionName}
              dataOptions={institutionSelectOptions}
            />
          )}
        </Field>
      </Col>
      <Col xs={12} md={6}>
        <Label required>
          {intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.criteria.location.camp' })}
        </Label>
        <Field name={`${prefix}campusId`}>
          {(fieldProps) => (
            <Select<string | undefined>
              {...fieldProps}
              fullWidth
              marginBottom0
              required
              aria-label={campusName === undefined ? 'Campus' : campusName}
              dataOptions={campusSelectOptions}
            />
          )}
        </Field>
      </Col>
      <Col xs={12} md={6}>
        <Label required>
          {intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.criteria.location.lib' })}
        </Label>
        <Field name={`${prefix}libraryId`}>
          {(fieldProps) => (
            <Select<string | undefined>
              {...fieldProps}
              fullWidth
              marginBottom0
              required
              aria-label={libraryName === undefined ? 'Library' : libraryName}
              dataOptions={librarySelectOptions}
            />
          )}
        </Field>
      </Col>
      <Col xs={12} md={6}>
        <Label required>
          {intl.formatMessage({ id: 'ui-plugin-bursar-export.bursarExports.criteria.location.loc' })}
        </Label>
        <Field name={`${prefix}locationId`}>
          {(fieldProps) => (
            <Select<string | undefined>
              {...fieldProps}
              fullWidth
              marginBottom0
              required
              aria-label={locationName === undefined ? 'Location' : locationName}
              dataOptions={locationSelectOptions}
            />
          )}
        </Field>
      </Col>
    </>
  );
}
