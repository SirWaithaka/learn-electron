## Electron Lessons

### Lesson 4

Electron has some APIs that are only available in the Main process and others in the Render process.
The two processes are decoupled in a way that memory is not shared between them. (As is obvius for OS processes anyway).
However electron provides a way in which the two processes can communicate together via IPC. The renderer process initiates the events and the main process listens for the events.

In this lesson I use IPC to call an API only available to the Main process. However indirectly. The renderer process initiates the IPC event and passes a payload that the Main process uses to display a dialog to the window.

However electron has got an API that exposes native APIs to the renderer process. You can use the remote API to call APIs that are abstracted from the renderer process.
