import Animation from './animation';
import Element from './element';
import Game from './game';
import $http from './http';
import Inputs from './inputs';
import Layer from './layer';
import Mask from './mask';
import Point from './point';
import Rectangle from './rectangle';
import Room from './room';
import Sprite from './sprite';
import Tile from './tile';
import Timer from './timer';
import Trait from './trait';
import Utils from './utils';

/**
 * @namespace Core
 * @description Core classes of JSGLib.
 * @property {Core.Animation} Animation Class allowing sprites animations.
 * @property {Core.Element} Element Main class handling the interactive game elements.
 * @property {Core.Game} Game Main class handling a game.
 * @property {Core.$http} $http Utils handling Ajax requests.
 * @property {Core.Inputs} Inputs Class handling users inputs, such as keyboard or mouse.
 * @property {Core.Layer} Layer Class handling the different game layers.
 * @property {Core.Mask} Mask Class used to define collisions masks on sprites tiles.
 * @property {Core.Point} Point A simple class handling points such as coordinates.
 * @property {Core.Rectangle} Rectangle A simple class handling rectangles.
 * @property {Core.Room} Room Class handling the different game rooms.
 * @property {Core.Sprite} Sprite Class used to load and manipulate sprites.
 * @property {Core.Tile} Tile Class used to decompose sprites into small squares called tiles.
 * @property {Core.Timer} Timer Class handling time based events.
 * @property {Core.Trait} Trait Class handling JSGLib traits.
 * @property {Core.Utils} Utils A collection of utils methods.
 * @example
 * import { Core } from 'jsglib';
 * console.log(Core);
 * @example
 * const { Game, Room, Sprite, Tile } = JSGLib.Core;
 */
export default {
    Animation,
    Element,
    Game,
    $http,
    Inputs,
    Layer,
    Mask,
    Point,
    Rectangle,
    Room,
    Sprite,
    Tile,
    Timer,
    Trait,
    Utils,
};