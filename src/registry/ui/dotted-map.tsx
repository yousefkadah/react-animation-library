"use client"

import { useMemo, type ReactNode, type SVGProps } from "react"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export interface DottedMapMarker {
  lat: number
  lng: number
  /** Marker radius in map units. Falls back to `dotRadius`. */
  size?: number
  /** Override the map-wide `pulse` setting for this marker. */
  pulse?: boolean
}

/** A marker after placement: `lat` / `lng` are replaced by its snapped `x` / `y` in map units. */
export type DottedMapPlacedMarker<M extends DottedMapMarker = DottedMapMarker> = Omit<M, "lat" | "lng"> & {
  x: number
  y: number
}

/** Arguments of `renderMarkerOverlay`. */
export interface DottedMapMarkerOverlayScope<M extends DottedMapMarker = DottedMapMarker> {
  marker: DottedMapPlacedMarker<M>
  index: number
  x: number
  y: number
  r: number
}

export interface DottedMapProps<M extends DottedMapMarker = DottedMapMarker> extends Omit<SVGProps<SVGSVGElement>, "width" | "height"> {
  /** Width of the SVG viewBox. */
  width?: number
  /** Height of the SVG viewBox. */
  height?: number
  /** Number of grid cells sampled across the map; more samples means more, closer-spaced dots. */
  mapSamples?: number
  markers?: M[]
  /** Fill of the land dots. Defaults to `currentColor`, so `text-*` classes colour the map. */
  dotColor?: string
  markerColor?: string
  dotRadius?: number
  /** Offset every other row by half a dot for a honeycomb pattern. */
  stagger?: boolean
  /** Pulse every marker (a marker can opt out with `pulse: false`). */
  pulse?: boolean
  /** Extra SVG drawn on top of each marker (labels, flags, icons). */
  renderMarkerOverlay?: (scope: DottedMapMarkerOverlayScope<M>) => ReactNode
}

/* ------------------------------------------------------------------------------------------------
 * A dependency-free port of `svg-dotted-map`'s `createMap` (MIT): lays a grid of `mapSamples` cells
 * over a Mercator world map (latitudes −56…71, longitudes −179…179) and keeps the cells that fall on
 * land. Produces the same points as the original for the same `width` / `height` / `mapSamples`.
 * --------------------------------------------------------------------------------------------- */

/**
 * Simplified world land outlines used by <DottedMap>, encoded to keep the bundle small.
 *
 * Polygons are separated by "|", the rings of one polygon (outline first, then holes) by "!".
 * Each ring is a list of [longitude, latitude] pairs in hundredths of a degree, delta-encoded
 * from the previous point and written as base64 VLQ (the source-map number format).
 *
 * Outline data from svg-dotted-map (MIT, © 2025 Jesse Winton), itself derived from the public
 * domain Natural Earth / world.geo.json country shapes.
 */
const LAND_POLYGONS = [
  "y+L6+GpErMkCjYoiBMkQ6KoSye2U8DlB6BxViDnX5EnIqB|u1ErkC/Kf3C2X1a9ElH2NjZtBmIllB9L9gB6oBDgfrBrIgJI8T|ksCnkBkFqG5G",
  "1B|sjEo/HlD0I7CqCjCUyClT|siKy3E0C7HiU7BuH8Nd+EnBkC9MlM|5nMjrEvW0CpF3FnIlLY9O/N9buE3RlIvPvG/iB4D3UlLle4dhMzD6J8",
  "V6V8Hqb+N2NwhB0XpK2SiFiX6Y0UjGsH3LrLjI+O|swI6gIyH1IuIjGqCG1JwP|ruL/wMvbjD1d7QxHxjBxtBhGpsCgGxxB7D/axKrhD0G32DN",
  "/4B5H7rB1L2ZvUpjBzIibrWrkGyF0pmCCr+DyXunBgpB+f4Q5pD0Th3BoKl8ByF59CpHttBmI72CzIxsCqCtdjCjgBjOx9BrF4G8O5lD4L3uCl",
  "TvtB3BtjB5G/wByD78BZ/pDzKnyBjJzBvItyCzNlrBvKmtBxM/4G7I37CiV6jD0Y6C+UhZ+V4SyP|8uN9vJnBnHyJMyBiE|ohch2C9azW/X0Qw",
  "J4OpVwDrS3EzH5LpXmBlV9SjJnP7mBvN9H/PiP9wB7ExM4StF0L4GyXSyPuKsgBwEsShH6nB5hBwjBtGuXsQ0R8doEiWxE4R7TqSnFmMtP+IrG",
  "8Y|kqD4sJFgDhV4BjZvIqFhEiVtC+OkC|+rJ6iI9J6ChJ7D0JxP6O7C|s3FlcyCKwE4MhJ3C|qZugK1JZ4TlKqC4DYmE|6QknB4F4hBlJ4B7H9",
  "FiGte|3Ro8B6R0IwFF6H8FjL2S9OrClU7RlBtI|mjS4pE3EiNxMkHxL7E+FpP+OuE+FlN|0tEw0I5BhMyDlG6TiD4LkBwD0K|zkPw0EpC6IpD3",
  "D|62Ds4I7C7NkEuFesI|4yE+wKKzO6jBrB6PyEzBgEvBiCoGMhJkP7Q8DzKvD|ltRqvDqBhM+DqQ|90M+pGAAAA|vjNluEoF2FuW1CyFsQ0WvD",
  "PoYhMIlCwP1e6NMqLnavHsFjK5Ftf|loL98F+XvL0C5Kgc8fwCuR0MmLgcgH+NiViFqkB8X+dVkW3dmQrJJ3sB4QhTubhI3M9JkB1MzCzP1D1K",
  "oY5W5IiBvO5QxBtS+CP1lB5SjG9GjOqL7PyQ1FmauHNrL0e7NkCxPgMJOpYuB/LyOzDmGpTiGtH|4pWqcmHrBUiH|k9RytFxKqDzHpG|+3FjqE",
  "7I4DpRuXlBQja3DHpWlGxS2KpM0KkJ4OtB|w/CsuBhF7QyJtPoP2HsGyJsSpGwM4GwSYxR4S5E4C/FuPzerU|7+K68J1TrT4mB9FzCmQ|1jNk6",
  "I2Q8G3D2SufqGmb+LrYiTrfkgB95BkN3aZzC/VsMpOterbvF2SlRe7kBuMrX0RmJgMypC4fvpBsJ/sB2UnU9Z/nCoBttDgPz4BpJjciFD56B0Q",
  "3EuZtE0JrHgRjLlDnKmT1V4cvLgtFAsqBtEukBvSW/WkjBmMmMyIiVCkOoP|zpWgpO3gB5JimB9S+tBgEwD6V|h9QopOvShPssCnGgdxP7gBtM",
  "grBhPqelGiZuax4B4dxlC2R|lsNunQrwE1H0oB9PxbhS63B7B20D0mB|+7BipJpNS/DnKwW0F|vjNluExPogB9E7E4BhTjFjnBtD9d7KtdxJh2",
  "B/FzFqEjjB+O/H+Y2H5dgMkLke5D2UuG+iBkIuPvE2R+N8bZ8O|o5W63J0ElUlzB/Z3a5F1T4FpiBqBxGuJpbyGEgKlUiPvCR5N9NvgBhN6BjQ",
  "lpBpSkIzMkB7B4QpK0F7Y6OtIudtMsOhCqE1DyHoGwKrD+RuJoRtGuI3EwD3hBkMpEmGuG4TwFgRpL2XAqZ2HqRiLuVghBlB0LpRkUuDiOzN8J",
  "kqBuHoQ6LyX0DDkDkEyH2DyH6LgF8H4OtK9BvRuDtHuEnNkI9NkP1R2BxJ3FhJ9O|9RmfGidjQyEvQhBzC5PyE5U|4xCmOqSAzJsPgF6QhC8Z9",
  "CkIhCtCnPtiB5PtDzEvKmHzPmKF|6iG4NjJgP3O+DxSZxM5GtSoGtGzJ7FxatSva9JmBlFrGc/BiZsBkH3N0a8E2C3X+KeyatI0DsXwMmBpIgP",
  "RgJ/BsKuDsJC2E6BuH|oxC9d8JnBsSua6FwapP3HrSAuIxW9UzQmF1G|j3OfsOxNkOK4F5MO0lBsS/C9FqU9ZyP9F0V6JqI/ZpH3LnMrDjJ2Ej",
  "V5KvP|zmQuzB0CsI/GyI7Me|niQ+wE6CpGsT3DiG9K2HuIvLkI|ysG07G4HR9B+B|q0Gk7G5HQyBzD|gqD4vJ6L0F/XiK9I/N|g+B03K3IFlKp",
  "J3E5QZnEenEgIxLoNTiZuI8I+N1FyQ|otIsvCzEhB2CjKqCqD|g+B03KiC+LxNnC4C9J|ngOm7DAtKmVwDzP+H|grC2yE1K2FlFilB3L+SiFyW",
  "vrBlC5WhJsFnSzYlOvVpHAtHD1BwXlPu5BtkB6I4C|91PpVsPwCuP6R5VyJhNpP|umHwpErR8ZkFgVjE4KxhBnCtXsEjB77B|2oIsuCyEgB7Xk",
  "UtFgN5JxG1C9PmSW4JzCsEnE|v4B4lI4OA9E9d+MnHsdyKqJkV0NiJze+FhmBiC|+3EmpL0S/B2C+ByCuJ|2jHk6CvPpeEzFoI9T0ajNsOkDsT",
  "4G2R4S3ZsH3EoFf2F3CiK3E2FtEmE5JyC|2yF2vN1xBIqUtT5RpVqLpR8tBiMvBglB|66iBtsDtEJ7B9EqHC|x+LjkKkD7CyQwCnMiE|ujBy1J",
  "5TkKniBtWiL3JvEpQye/F6b0H5DsO+DmKhIwL|qlC9Y8UyQvIwWpLDnL7HrEpN|5SwuL3TzL4PzNpKvQqKhLiasDRwN/P0S|2jI0jI2M7C2IgB",
  "gJ6D9FgE7FqB9boFZX|0GilBxG6f7R1IHjd|50BiwByC4P9GkN9Oa3Ne/I3J4LtNqNmHyFpK|ppDmyC2FF+BiD7GF|z+CglC+I2J1SpB|q7BqG",
  "mL6HnKE|8iFk/HMqG7TjDjMlDvFzH|pkJukQrjDtF3hC9Ukd7Og+BtD0c7YGpb0OpWiVrRwe5EqWwhBsrC6S4hBsK7GmMuZ8NjC6b6uB8Pj9C+",
  "N|lzR81C2EoEiHmIvEgBrBgM1LC3HxU|50KuO8JlBgI2MtOgK5C3J|x1Lq0BjG7T0KpYyP0DtJwNyF+L|5hRmxCiayM1HoFjYXjHnI4JxG|21D",
  "++IlO2D7RpGoe7R6C6NsCsChC4B|ngOm7DlG9HkGxC|olD6kJqCnCkO3D6E0B8DJyP+K9DsD/f9B|oxbpQ3Q0FvY3G+VtQ0EjM4OpL|4uY8Inb",
  "XpN3Z0Jbb6T0amB|stVyMzDvPiHvPkkBzEwJ8RoC8ezMiB7HhS3ZlE|s1UzkB6BuR3Q2OnlBolB+GvV8Y5lB|wmP69GxW1EkBzXzajcuFrN9Rn",
  "EqOzRwNgD0FzhBkTrsBuUkJ+C0iBs2BwmB/FoPwL6EwMlH2EjNsPqc4NyKpRsG/RvJjS/CrE0D/RnHpgB8MsG2I7OsI|5mB2wKzI8HpN7HiH7N",
  "|gxKwoHtKlDlVkK7O6CrCHvIiGxD9KuHvMAzM2TpZuS9M4kBrN0ZlEsLwKrPmTlCiYoEqMrMgL|87I8gHjEuHlPMtIzR9NxGyC1HuiB1S0LR6I",
  "wF2DL3ToZ|36Cs/M/lBzEgM/NyfmK|o/GusGUyDrEnBrBvWgDuM/CdyBsHqCd|q2C2iJjVsCxW1F4DtOiJoEkU1QuLoY|7kPyzDoC/EqF8C|m+",
  "GuqGf1FhDvMIdgTmHwHqKzC0HnTnE|kxbkoH3J4GvX7QlTV9CxJyyB2H|w7NmoIqUuG6lB/F7BiQugBgN4N8N9YyL9UpB3T0W1VpG9gBoJ3S9D",
  "papEtIxT/fgDxXkElU3H5G/M+NnIwCpEoV9c2V/CJiXiQ2D+VjNiSuBqLhQ|+jIxK7D+bwFiHtOlD1aiNjI9HuG1OlH9R4XvNsJ9J|w7NmoIK3",
  "M2QjFkpBoS7lB+F|mhUmsC8K1K4TyLX0LxNO/NJ|miZqxHzNtF+BhVoQqE|2gE0lImGuCpIwDnBtB6CrC|8rJs7F7IxFyLvD|0xUm5CwNPmBoG",
  "vP2VlEiNnO2KnGvG1GtGuMvOyLa|8/GgwGkByIvF5J|nwBqbzE4UnLwEzHlK|68C8uEqGuD8xB/XoHkPiB67B/akHjLpPhYwMxXuFzM3RkFjlB",
  "0K3F|m/PgvBlNoEkE/N|k1Fh1FtM5F2E5E8GyD|iuEyzK2E1C6S2K/hByCqBpF|4lBq5JrC5DoDP|0jEm+K+hBzCyKuDzFmI1S+B|zN67GxX2D",
  "jR5P1F3UxehXlQnemOQgV0hBiQ8EeAAsHuVoHyYkO|smFstJiKjRyF4O|01J/tC9iB9eyC1QhHvM+ErSkTKgP+wBkG4L|9nR0zD6HgTnUtDjD5",
  "K9WlHnJqErMyWkCoVrJqDlM6S9VmB7M2Nnc1CnmBuH0Q3hBsgBtEsU/WwGzVgavN2axJ2LuDsPtK2HwU0LD|2gE0lI2CtGiMkDzDkGhFP|jsCs",
  "7CkE1N8Ob8GlNuQgBkBsIkU6R8OqCsUgE+DuWv5BskBzJF2Fl7BrmBX|i7CigHZWVT|+nTi+BwGoM7KwjBuCsN2LuE0GsGlMoExD2hBvI2E5Nz",
  "KtPrc9BzIoMtPdzN0SyFgKriB|s7D6qIiCVmBsBxGuElEvF|ukRk0JkUjPFhKobzGwGvJoiBrB0T5F2a4FkzB+Z1EkU1lB5E7dgI7NhCvR+I1Q",
  "9GrVzCnE+C/LgC|g4GhoCvIrPtS1JkQxHR7S9J7PiEvWuBzF4EDuQsQnEkbkdkTqI2M9ByY7MpDrK/B|jsCs7CkD6EqmBW3Fk7ByJExXkPzUnJ",
  "hG5c7ZjC8E3FlB3Y4L8C|g4GhoC9DuLtH8CyElI5BxV|s+T8mB7MwBkIlXuMkN|4gX8ZnPmIVjHnHqBxH/I9U7GqF5H2ZkE6HgS|mmD1yFmWYA",
  "iXkGwSGoWia2D1LchfqB7oBC6Pje+Flf|ksgB5jEpIgG7BhCkI5H|uN0qCkJ5B4EiNid5FogBnCgCsChGuJ2KkOwB0ZvC0DzB2J7R6DxnBnY7I",
  "5C/DvWtUhE|k1B6dyEuK4PsDmPsiBpgBmCjd4F5EjN5F5hBoKC6JzM|33QqlC6MfmDsZjazM|mrBouK9R7NmN/C|2yF2vN1CoNn4BzIj2BrhB1",
  "iB5PoElVwhB2B0F2aoeweoY8G|4mRouFtOgCvdsMtG3IogB9M|s5hB5/HrlBnaoOzJ4eue|qjiBhiH/E/U2NlLoMoN|+rKioDodkP0MoUrVsQv",
  "H9NrB/Q5SpG|41OioH3U9DpSzelQ7KpiBNqPnTtLxKuemCqL9K8RmEvFqNyaiclByXwW0E|5mPktBqDiJ9N8F1SJ1CtI|/yN9tD4FsftFiKzQ0",
  "FrL6P8GiO4SiG5F4MlOLtOwNvP7RtPxC/FlRqJzGuX1uBojBlX|81Yy0BjS4ByE7P|o2X0zD7F1FhCvQqPoN|uxbh5BgKrBmN0K6T1P2L1BxgB",
  "6oBtW8H|89Cu/J+XjKmXzCiGyPLyO3E0CnTU1iBnE|p+M4zDlFARzDqIG|wwZgpIzX1DpQ7L+L1NyNsF|v4B4lIlD1TgNpK8E8d|5nMjrE0enS",
  "iI/O2LqLnGoTzOyDvB+L1WuD|y9J46E0DboBqH1DqB|+tEorJzP/KoP7L8kBrDwG8JzIoBjKiR|iuEyzKlJsFjK5E|uwZksIwakDugByfiIgd9",
  "mBoKmsB+a24B1BiiByQoVzFrdpgBwIrbqhBiY8Iqf4sB+Cm2BwQ+DwMA8Y5a4Ft8C5CzY+JtnDsL5DxIrnCiDpJ+JrxCGjSuThsC1BjzDxRjiC",
  "7DpoB7Vl9BrEj9BvR9pCgYlWpF2IzIuBhlBhNxPzCvJ3C/ByFnI6Q9DgJlPpGNuBjCuF7CqQ5GkC/DoUjEoJ9DlC7IpJnCJ7CpEpPkP1HYW8bp",
  "F6FrB8FhE8J7CnIgUkPmLxCoE/NmI4G+MkU2HwXlE+fhDsIwToaoE2S8D8gBpJ0VoG2T1W8UoB8YzLuCQicsJ+LhCmE/CqVyC0Q8GuR/I6NgC6",
  "dhI0lB4EqQyBgJ8OwJ2F0R3B8NlPmNlIsHvEuRvDsK8B9H5O7LhF3DzH|k+FjHpFrBvDtJgJ2C6BY|tqD8lEJ1C6ZiCgG4cyUmJC0BfAjQ9EhV",
  "1hB|srImmD4D2H0W/DoNuKgSsC4SoGqB+QjU6B1C6HnBsC1Da/O2XzLuD1LQviB0SxHrKhTnHiBlIgVrbiEhP|o0Gk7BAYuPoe0C8P4JwG1JgZ",
  "nqCApHlPK7YzLzQkFtL+FvPQLsHqKsYvFwaoI|o0Gk7B3E8HxapItYuFtHrKoEvCwR5S2O/D+G7G8T0EiI8HpI8T|voDg1C6GE/BjD3FEgB5E0",
  "SoB2NflE0NjPsM5L9C|onfl0BxBgChIsEuB3CsDpC|xnCuqByHkKzFoKrNnH|3kR0zC5JwG3EpE|2qJgyBmHmVle9FjGqGrCrDe3F2EpF|+jIx",
  "K2JqMuViQgS2YgK+XnN2EnHnV3R5StT5GxFjH|0tEw0IpP6L9DIrDjEgC5BFtCftIwGvEoIxDgFO|nlLqlBzF/LsJxN0MyCY8L4C2J|61Ds1J7",
  "L1FEhD+f8B+CmE|q2C2iJa5FtBT6RoGrCmC|+kC8vL+L9VsS0EmS8Y9F2Q6lBsUrUsTpY9Gpexe|uoGjnFvByFhFWnCrG|uyH0wG8NwGsIyR5m",
  "B7IfrHlBzIVzD|06CswC8ClIgC9Z6Q+CyeqUlFsLyLyQL6Y9xB+XrGvDyB3JuC1DxB1Z3KlO|2LsmBjGsexFEwG7f|mhUmsCwC4M+NI9H6YzLb",
  "vMuO3LvEvCtN6KxjBxGpM0J3V6MxB3SsXuLyV|67Nw7HxKiDtJtWmX4EwVjDlIyM|y+L6+GmhB2KpoBuZ3ZZ3V+C8I1cohBqB|itYz3BYlD4Lw",
  "EhC2B|xhMojCT5EoFWI2E|o7Bu9FyM2RvDgQ5P6HjFzW|2jI0jIhU3D9T6GjlBlFnThLmJxRm1BpF4mB6IkPNtDgFwD8KzH0I|8iFk/HkMuH5L",
  "lB|k5Xu4EvKnFgE/J|8zG/F5VlBkCpHrGxNzCLQhJ8K1QgK/DsH9C8DvL8NPqK+B4EuRC6XtJ8J|k+FjH4VkBkH8RvG0O9T1EkCnIjIhK7BvHD",
  "3E|2mG0lK7PzE7jBqBjGzP/CnE8DtDuYkC0PrCzF5OyIpB81BqLI6CoJmCkC6IpJ8DpUiElC+DrQ4G|loL98FjFjX6VxG6JsH1C4K|1jNk6IlN",
  "uOlOpPjVDnMzIljBnMX+WvkBuStqBsEhtFAzLlF+E1Q/DnRgF9XgVlcoUhMmmBvHmc0C6M3N8VnBkM7SqJrDgB0J4QkNuiBoFmiBtC8P1d+GwK",
  "/IiYsSyT0RyKC+O8K6Q8UqFoD4N|nxb2zN5iE8D5mBldmW5P5JrKw0BzY08BiP+yB5CmkB9IuZ5NhRiL1JqHvZsE1Q2E|4/MwpHmIrBsJsWwKj",
  "DL2Mza9GrLgQjSvB/ViNjQ3DIjX2ZY|79N0pC7JrI8F1V8ZzP8FrU4QwBjBuO4W4IiG6TzS6MliBc|qjV2mEhRoL5TxFmO3KkEjNuP3VnBpGW1",
  "L5TzLmF7LoZmThCyWlU0X|u0gBr9ChC1EgDP|m+GuqGrCczBtH+Cc|+rKioD/G2OhStCpNvK1W+D5D3HsEnXwgBwI|mmD1yFuUhnBuSgGiURoP",
  "qHwa+bqC4J5EC1IDmCqGgFXjEuWhLgBxXpV5OsB1KlJ3KoMAjX!k1Fh1Fb/G9GzD3E4E|4sG35BhK+D1C0BxMnB1DtXzasItMrMJ9TqIhJ0Ldk",
  "BRkLpBmUmPsS0J4BwV|+iGjrE8J6PQ6SlQwHnUnPlLoBoRvX6I5D",
].join("")

interface MapPoint {
  x: number
  y: number
}

interface Ring {
  coords: Float64Array
  length: number
  minX: number
  minY: number
  maxX: number
  maxY: number
}

interface Polygon {
  outer: Ring
  holes: Ring[]
}

interface Land {
  polygons: Polygon[]
  minX: number
  minY: number
  maxX: number
  maxY: number
}

const EARTH_HALF_CIRCUMFERENCE = 20037508.34
const REGION = { lat: { min: -56, max: 71 }, lng: { min: -179, max: 179 } }
const VLQ_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
/** Dots are inset from the edges by `radius * 1.25`; the original"s default radius is 0.3. */
const EDGE_INSET = 0.3 * 1.25

function project(lng: number, lat: number): [number, number] {
  const x = (lng * EARTH_HALF_CIRCUMFERENCE) / 180
  const y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180)
  return [x, (y * EARTH_HALF_CIRCUMFERENCE) / 180]
}

function decodeRing(encoded: string): Ring {
  const values: number[] = []
  let value = 0
  let shift = 0
  for (const char of encoded) {
    const digit = VLQ_ALPHABET.indexOf(char)
    value += (digit & 31) << shift
    if (digit & 32) {
      shift += 5
      continue
    }
    values.push(value & 1 ? -(value >>> 1) : value >>> 1)
    value = 0
    shift = 0
  }

  const length = values.length / 2
  const coords = new Float64Array(values.length)
  let lng = 0
  let lat = 0
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (let index = 0; index < length; index++) {
    lng += values[index * 2]
    lat += values[index * 2 + 1]
    const [x, y] = project(lng / 100, lat / 100)
    coords[index * 2] = x
    coords[index * 2 + 1] = y
    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)
  }
  return { coords, length, minX, minY, maxX, maxY }
}

let land: Land | null = null

function getLand(): Land {
  if (land) return land
  const polygons = LAND_POLYGONS.split("|").map((polygon) => {
    const [outer, ...holes] = polygon.split("!").map(decodeRing)
    return { outer, holes }
  })
  land = {
    polygons,
    minX: Math.min(...polygons.map((polygon) => polygon.outer.minX)),
    minY: Math.min(...polygons.map((polygon) => polygon.outer.minY)),
    maxX: Math.max(...polygons.map((polygon) => polygon.outer.maxX)),
    maxY: Math.max(...polygons.map((polygon) => polygon.outer.maxY)),
  }
  return land
}

function isInsideRing(x: number, y: number, ring: Ring): boolean {
  if (x < ring.minX || x > ring.maxX || y < ring.minY || y > ring.maxY) return false
  const { coords, length } = ring
  let inside = false
  for (let index = 0, previous = length - 1; index < length; previous = index++) {
    const xi = coords[index * 2]
    const yi = coords[index * 2 + 1]
    const xj = coords[previous * 2]
    const yj = coords[previous * 2 + 1]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

function isOnLand(x: number, y: number, world: Land): boolean {
  if (x < world.minX || x > world.maxX || y < world.minY || y > world.maxY) return false
  for (const polygon of world.polygons) {
    if (!isInsideRing(x, y, polygon.outer)) continue
    if (!polygon.holes.some((hole) => isInsideRing(x, y, hole))) return true
  }
  return false
}

interface CreateMapOptions {
  width: number
  height: number
  mapSamples: number
}

function createMap({ width, height, mapSamples }: CreateMapOptions) {
  const aspect = width / height
  const rows = Math.round(Math.sqrt(mapSamples / aspect))
  const columns = Math.round(rows * aspect)

  const [xMin, yMin] = project(REGION.lng.min, REGION.lat.min)
  const [xMax, yMax] = project(REGION.lng.max, REGION.lat.max)
  const xRange = xMax - xMin
  const yRange = yMax - yMin
  const innerWidth = width - 2 * EDGE_INSET
  const innerHeight = height - 2 * EDGE_INSET

  const world = getLand()
  const points: MapPoint[] = []
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const x = EDGE_INSET + (column / (columns - 1)) * innerWidth
      const y = EDGE_INSET + (row / (rows - 1)) * innerHeight
      if (isOnLand((x / width) * xRange + xMin, yMax - (y / height) * yRange, world)) points.push({ x, y })
    }
  }

  /** Snaps each marker to the nearest grid cell, replacing `lat` / `lng` with `x` / `y`. */
  function addMarkers<M extends { lat: number; lng: number }>(markers: M[]) {
    return markers.map(({ lat, lng, ...rest }) => {
      const [projectedX, projectedY] = project(lng, lat)
      const column = Math.round(((projectedX - xMin) / xRange) * (columns - 1))
      const row = Math.round(((yMax - projectedY) / yRange) * (rows - 1))
      return {
        ...rest,
        x: EDGE_INSET + (column / (columns - 1)) * innerWidth,
        y: EDGE_INSET + (row / (rows - 1)) * innerHeight,
      }
    })
  }

  return { points, addMarkers }
}

const EMPTY_MARKERS: never[] = []

export function DottedMap<M extends DottedMapMarker = DottedMapMarker>({
  width = 150,
  height = 75,
  mapSamples = 5000,
  markers = EMPTY_MARKERS,
  dotColor = "currentColor",
  markerColor = "#FF6900",
  dotRadius = 0.2,
  stagger = true,
  pulse = false,
  renderMarkerOverlay,
  className,
  style,
  ...svgProps
}: DottedMapProps<M>) {
  const reducedMotion = useReducedMotion()
  const map = useMemo(() => createMap({ width, height, mapSamples }), [width, height, mapSamples])

  // Smallest horizontal gap between dots, and the row index of every y, for the stagger offset.
  const { xStep, rowIndex } = useMemo(() => {
    const sorted = [...map.points].sort((a, b) => a.y - b.y || a.x - b.x)
    const rows = new Map<number, number>()
    let step = 0
    let previousY = Number.NaN
    let previousX = Number.NaN
    for (const point of sorted) {
      if (point.y !== previousY) {
        previousY = point.y
        previousX = Number.NaN
        if (!rows.has(point.y)) rows.set(point.y, rows.size)
      }
      if (!Number.isNaN(previousX)) {
        const delta = point.x - previousX
        if (delta > 0) step = step === 0 ? delta : Math.min(step, delta)
      }
      previousX = point.x
    }
    return { xStep: step || 1, rowIndex: rows }
  }, [map])

  const offsetX = (y: number) => (stagger && (rowIndex.get(y) ?? 0) % 2 === 1 ? xStep / 2 : 0)
  const placedMarkers = map.addMarkers(markers)

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("text-gray-500 dark:text-gray-500", className)}
      style={{ width: "100%", height: "100%", ...style }}
      {...svgProps}
    >
      {map.points.map((point, index) => (
        <circle key={`${point.x}-${point.y}-${index}`} cx={point.x + offsetX(point.y)} cy={point.y} r={dotRadius} fill={dotColor} />
      ))}

      {placedMarkers.map((placed, index) => {
        const x = placed.x + offsetX(placed.y)
        const y = placed.y
        const r = placed.size ?? dotRadius
        const shouldPulse = (pulse ? placed.pulse !== false : placed.pulse === true) && !reducedMotion
        const pulseTo = r * 2.8

        return (
          <g key={`${placed.x}-${placed.y}-${index}`}>
            <circle cx={x} cy={y} r={r} fill={markerColor} />

            {shouldPulse ? (
              <g pointerEvents="none">
                <circle cx={x} cy={y} r={r} fill="none" stroke={markerColor} strokeOpacity={1} strokeWidth={0.35}>
                  <animate attributeName="r" values={`${r};${pulseTo}`} dur="1.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0" dur="1.4s" repeatCount="indefinite" />
                </circle>
                <circle cx={x} cy={y} r={r} fill="none" stroke={markerColor} strokeOpacity={0.9} strokeWidth={0.3}>
                  <animate attributeName="r" values={`${r};${pulseTo}`} dur="1.4s" begin="0.7s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0" dur="1.4s" begin="0.7s" repeatCount="indefinite" />
                </circle>
              </g>
            ) : null}

            {renderMarkerOverlay?.({ marker: { ...placed, x, y } as DottedMapPlacedMarker<M>, index, x, y, r })}
          </g>
        )
      })}
    </svg>
  )
}
