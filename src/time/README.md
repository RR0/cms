# RR0 CMS Time API

This API allows to render time (text and/or HTML) in absolute or relative ways.

It relies on two packages:

- [**@rr0/time**](https://www.npmjs.com/package/@rr0/time) and its [EDTF](https://www.loc.gov/standards/datetime/) format support (which is an extension of the standard ISO 8601 standard)
  to support different time expressions (fuzzy dates, intervals, durations, etc.)
- [**@ssg-api**](https://www.npmjs.com/package/ssg-api) to perform replacements in HTML pages/templates.

See details about rendering:

- [text](text/README.md)
- [HTML](html/README.md)
