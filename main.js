miro.onReady(() => {
  miro.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'Throw Dice',
        svgIcon:
          '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
        positionPriority: 1,
        onClick: async () => {
          // Get selected widgets
          let selectedWidgets = await miro.board.selection.get()

          // Filter stickers from selected widgets
          let stickers = selectedWidgets.filter((widget) => widget.type === 'STICKER')

          // Delete selected stickers
          for sticker in stickers {
            sticker.text = '';
          }

          miro.board.widgets.update(stickers);
          /* 
          // Create shapes from selected stickers
          await miro.board.widgets.create(
            stickers.map((sticker) => ({
              type: 'shape',
              text: sticker.text,
              x: sticker.x,
              y: sticker.y,
              width: sticker.bounds.width,
              height: sticker.bounds.height,
            })),
          )
          */

          // Show success message
          miro.showNotification('Stickers has been converted 3')
        },
      },
    },
  })
})
