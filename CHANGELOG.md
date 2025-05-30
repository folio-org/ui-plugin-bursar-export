# Change history for ui-plugin-bursar-export

## In progress

* Select element should has an accessible name. Refs UIPBEX-50.

## [5.0.0](https://github.com/folio-org/ui-plugin-bursar-export/tree/v5.0.0) (2025-03-20)
[Full Changelog](https://github.com/folio-org/ui-plugin-bursar-export/compare/v4.0.3...v5.0.0)

* *BREAKING* migrate stripes dependencies to their Sunflower versions. Refs UIPBEX-65.
* *BREAKING* migrate react-intl to v7. Refs UIPBEX-66.

## [4.0.3](https://github.com/folio-org/ui-plugin-bursar-export/tree/v4.0.3) (2024-11-02)
* Fix GitHub Actions workflow not running for tags. Refs [FOLIO-4086](https://folio-org.atlassian.net/browse/FOLIO-4086).
* Fix bug related to saving transfer configuration. Refs [UIPBEX-62](https://folio-org.atlassian.net/browse/UIPBEX-62).

## [4.0.2](https://github.com/folio-org/ui-plugin-bursar-export/tree/v4.0.2) (2024-05-08)
[Full Changelog](https://github.com/folio-org/ui-plugin-bursar-export/compare/v4.0.1...v4.0.2)
* Check token.conditions is defined and is an array. Refs UIPBEX-58.

## [4.0.1](https://github.com/folio-org/ui-plugin-bursar-export/tree/v4.0.1) (2024-04-25)
[Full Changelog](https://github.com/folio-org/ui-plugin-bursar-export/compare/v4.0.0...v4.0.1)
* Fix issue with configuration validation. Refs UIPBEX-58.
* Update CI scripts to new shared workflow. Refs UIPBEX-59.

## [4.0.0](https://github.com/folio-org/ui-plugin-bursar-export/tree/v4.0.0) (2024-03-19)
[Full Changelog](https://github.com/folio-org/ui-plugin-bursar-export/compare/v3.0.0...v4.0.0)
* Support the new bursar export configuration feature and revamped UI. Refs UXPROD-3603.
* Also support `feesfines` interface version `19.0`. Refs UIPBEX-55.

## [3.0.0](https://github.com/folio-org/ui-plugin-bursar-export/tree/v3.0.0) (2023-10-16)
[Full Changelog](https://github.com/folio-org/ui-plugin-bursar-export/compare/v2.4.0...v3.0.0)
* Support `feesfines` interface version `18.0`. Refs UIPBEX-45.
* *BREAKING* bump `react-intl` to `v6.4.4`. Refs UICAL-275
* *BREAKING* Upgrade react v18.0.0. Refs FOLIO-3876.
* *BREAKING* Upgrade dependent modules.

## [2.4.0](https://github.com/folio-org/ui-plugin-bursar-export/tree/v2.4.0) (2023-02-20)
[Full Changelog](https://github.com/folio-org/ui-plugin-bursar-export/compare/v2.3.0...v2.4.0)
* Bump stripes to 8.0.0 for Orchid/2023-R1. Refs UIPBEX-41.
* move final-form and final-form-arrays to peer-deps. Refs UIPBEX-42

## [2.3.0](https://github.com/folio-org/ui-plugin-bursar-export/tree/v2.3.0) (2022-10-27)
[Full Changelog](https://github.com/folio-org/ui-plugin-bursar-export/compare/v2.2.1...v2.3.0)
* Upgrade Users interface to 16.0. Refs UIPBEX-39.
* Update translations

## [2.2.1](https://github.com/folio-org/ui-plugin-bursar-export/tree/v2.2.1) (2022-07-22)
[Full Changelog](https://github.com/folio-org/ui-plugin-bursar-export/compare/v2.2.0...v2.2.1)
* Remove react-hot-loader from package.json. Refs UIPBEX-34.
* Replace babel-eslint with @babel/eslint-parser. Refs UIPBEX-36.

## [2.2.0](https://github.com/folio-org/ui-plugin-bursar-export/tree/v2.2.0) (2022-07-08)
[Full Changelog](https://github.com/folio-org/ui-plugin-bursar-export/compare/v2.1.0...v2.2.0)
* Compile Translation Files into AST Format. Refs UIPBEX-11.

## [2.1.0](https://github.com/folio-org/ui-plugin-bursar-export/tree/v2.1.0) (2022-03-03)
[Full Changelog](https://github.com/folio-org/ui-plugin-bursar-export/compare/v2.0.1...v2.1.0)
* Refactor psets away from backend ".all" permissions. Refs UIPBEX-26
* Purge `uuid` since it is no longer in use. Refs UIPBEX-29

## [2.0.1](https://github.com/folio-org/ui-plugin-bursar-export/tree/v2.0.1) (2021-11-08)
[Full Changelog](https://github.com/folio-org/ui-plugin-bursar-export/compare/v2.0.0...v2.0.1)
* Rename the label "Max. days outstanding" to "Fees/Fines older than (days)". Refs UIPBEX-27

## [2.0.0](https://github.com/folio-org/ui-plugin-bursar-export/tree/v2.0.0) (2021-10-06)
[Full Changelog](https://github.com/folio-org/ui-plugin-bursar-export/compare/v1.1.2...v2.0.0)
* Support `feesfines` interface version `17.0`. Refs UIPBEX-21.
* increment stripes to v7. Refs UIPBEX-22.

## [1.1.2](https://github.com/folio-org/ui-plugin-bursar-export/tree/v1.1.2) (2021-07-28)
[Full Changelog](https://github.com/folio-org/ui-plugin-bursar-export/compare/v1.1.1...v1.1.2)

* Pin @folio/stripes-acq-components version.

## [1.1.1](https://github.com/folio-org/ui-plugin-bursar-export/tree/v1.1.1) (2021-07-20)
[Full Changelog](https://github.com/folio-org/ui-plugin-bursar-export/compare/v1.1.0...v1.1.1)

* Save multiple transfer types for multiple owners in one bursar config. Refs UIPBEX-15.

## [1.1.0](https://github.com/folio-org/ui-plugin-bursar-export/tree/v1.1.0) (2021-06-17)
[Full Changelog](https://github.com/folio-org/ui-plugin-bursar-export/compare/v1.0.0...v1.1.0)

* Bursar Item Types for Fees/Fines. Refs UIPBEX-9.
* Rename Bursar export to Transfer criteria. Refs UIPBEX-10.

## [1.0.0](https://github.com/folio-org/ui-plugin-bursar-export/tree/v1.0.0) (2021-03-19)

* Project Setup: ui-plugin-bursar-export. Refs UIPBEX-1.
* Bursar exports configuration form (UI). Refs UIPBEX-5.
* Enable FOLIO to define FTP file destinations for automated exports. Refs UIPBEX-2.
* Run bursar export manually. Refs UIPBEX-3.
