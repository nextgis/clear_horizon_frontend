// import PolylineMeasure from 'leaflet.polylinemeasure';
// import { WebMap } from '@nextgis/webmap';

// export function crateLineMeasureControl(webmap: WebMap): void {
//   const measureControl = new PolylineMeasure({
//     showBearings: true,
//     bearingTextIn: 'In',
//     bearingTextOut: 'Out',
//     tooltipTextFinish: 'Кликните чтобы <b>завершить изменрение</b><br>',
//     tooltipTextDelete: 'SHIFT + клик чтобы <b>удалить точку</b>',
//     tooltipTextMove: 'Клик + тянуть чтобы <b>передвинуть точку</b><br>',
//     tooltipTextResume: '<br>CTRL + клик чтобы <b>продолжить линию</b>',
//     tooltipTextAdd: 'CTRL + клик чтобы <b>добавить точку</b>',
//     measureControlTitleOn: 'Перейти в режим измерения',
//     measureControlTitleOff: 'Выйти из режима измерений',
//     measureControlLabel:
//       '<i class="fas fa-ruler-combined btn-control-icon"></i>',
//     measureControlClasses: [],
//     unitControlLabel: {
//       metres: 'м',
//       kilometres: 'км',
//     },
//   });
//   // @ts-ignore
//   this.ngwMap.mapAdapter.map.on(
//     // @ts-ignore
//     'polylinemeasure:toggle',
//     (opt: { sttus: boolean }) => {
//       if (opt.sttus) {
//         this._stopToggleControlsFor('measure');
//         this.ngwMap.disableSelection();
//       } else {
//         this.ngwMap.setCursor('default');
//         this.ngwMap.enableSelection();
//       }
//     },
//   );
//   this._stopToggleControlsCb.push({
//     name: 'measure',
//     stop: () => {
//       if (measureControl._measuring) {
//         measureControl._toggleMeasure();
//       }
//     },
//   });
//   return measureControl;
// }
