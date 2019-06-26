const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
