const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 32px; width: 32px;"><path d="M0 0h512v512H0z" fill="#000" fill-opacity="0"></path><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36h-363zm48.97 36.03A50 50 0 0 1 172 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm268 0A50 50 0 0 1 440 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zM122 206a50 50 0 0 1 0 100 50 50 0 0 1 0-100zm268 0a50 50 0 0 1 0 100 50 50 0 0 1 0-100zM123.47 340.03A50 50 0 0 1 172 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm268 0A50 50 0 0 1 440 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97z" fill="#000" fill-opacity="1"></path></g></svg>'

function authorize() {
  return miro.isAuthorized().then(isauth => {
    if (!isauth)
      return miro.board.ui.openModal('not-authorized.html')
        .then(response => {
          if (response === 'success') {
            return Promise.resolve();
          }
          return Promise.reject("auth fail");
        });
    return Promise.resolve();
  });
}

miro.onReady(() => {
  authorize().then(() => miro.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'Dropper',
        svgIcon: icon,
        positionPriority: 1,
        onClick: async () => {
          miro.board.ui.openLibrary('https://qollin.github.io/MiroPlayground/content.html', {
            title: 'Dropper'
          })
        },
      },
    },
    getWidgetMenuItems: (widgets) => {
      return {
        title: 'Dice Roller On PostIt Notes',
        svgIcon: icon,
        tooltip: 'Roll Selected',

        onClick: () => {
          return Promise.all(widgets.map(w => miro.board.widgets.get({ id: w.id }).then(w => w[0]))).then(widgets => {
            return Promise.all(widgets.map(widget => {
              metadata = widget.metadata[miro.getClientId()];
              newtxt = widget.text;
              return miro.board.widgets.update({
                id: widget.id,
                text: newtxt
              });
            }))
          })
        }
      }
    }
  }));
});
