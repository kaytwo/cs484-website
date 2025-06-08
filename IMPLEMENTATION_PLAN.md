# Relative Date System Implementation Plan

## Phase 1: Core Infrastructure
- [x] Create course configuration file (`src/courseConfig.yaml`)
- [x] Create date calculation utility (`src/utils/dateUtils.ts`)
  - [x] Implement `calculateAbsoluteDate` function
  - [x] Add unit tests for date calculations
- [x] Update content configuration (`src/content/config.ts`)
  - [x] Add relative date fields to schemas
  - [x] Make absolute date fields optional temporarily

## Phase 2: Content Loader Updates
- [x] Modify Astro content loaders to handle relative dates
- [x] Create custom content loader that wraps Starlight loader
- [x] Add relative-to-absolute date conversion logic
- [x] Test with sample content

## Phase 3: Content Migration
- [x] Create validation script to ensure correct date conversions
- [x] Convert lecture, homework, and exam files to use relative dates
- [x] Test conversions to ensure they work correctly

## Phase 4: Testing & Verification
- [ ] Run validation script on all converted files
- [ ] Manual verification of schedule page
  - [ ] Check first few weeks
  - [ ] Check dates around skipped weeks
  - [ ] Check last few events
- [ ] Test individual homework pages
- [ ] Test "Jump to Nearest Date" functionality

## Phase 5: Cleanup
- [ ] Remove absolute date fields from all content files
- [ ] Update content configuration to make relative dates required
- [ ] Remove temporary absolute date fields from schemas
- [ ] Update documentation

## Notes
- Each step should be completed and verified before moving to the next
- Keep absolute dates in files until all testing is complete
- Document any issues or edge cases discovered during implementation 