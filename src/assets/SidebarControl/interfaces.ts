export interface SidebarControlEvents {
  /**
   * @eventProperty
   */
  hide: any;
  /**
   * @eventProperty
   */
  show: any;
  /**
   * @eventProperty
   */
  shown: any;
  /**
   * @eventProperty
   */
  hidden: any;
}

export interface SidebarControlOptions {
  closeButton?: boolean;
  autoPan?: boolean;
  position?: 'left' | 'right';
}
