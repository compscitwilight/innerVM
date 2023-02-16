# Inner Etiquette - Packages
Welcome to the first page of the Inner Etiquette documentation. This series of documentation covers community expectations that contributors must present when contributing to the InnerVM, and other libraries.

This page covers some of the etiquette when involving packages in your Inner project.

## Node.js Packages
When using Node.js packages (or any other external packages) in an Inner project, it is recommended that you use them in an area of your project that is independent (e.g kernel `index` file, hardware files, standalone libraries (file systems, desktop enviornments), command handlers).