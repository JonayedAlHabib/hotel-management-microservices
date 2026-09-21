
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model RoomType
 * 
 */
export type RoomType = $Result.DefaultSelection<Prisma.$RoomTypePayload>
/**
 * Model RoomTypePhoto
 * 
 */
export type RoomTypePhoto = $Result.DefaultSelection<Prisma.$RoomTypePhotoPayload>
/**
 * Model Room
 * 
 */
export type Room = $Result.DefaultSelection<Prisma.$RoomPayload>
/**
 * Model Guest
 * 
 */
export type Guest = $Result.DefaultSelection<Prisma.$GuestPayload>
/**
 * Model Reservation
 * 
 */
export type Reservation = $Result.DefaultSelection<Prisma.$ReservationPayload>
/**
 * Model ReservationStatusHistory
 * 
 */
export type ReservationStatusHistory = $Result.DefaultSelection<Prisma.$ReservationStatusHistoryPayload>
/**
 * Model ReservationChangeLog
 * 
 */
export type ReservationChangeLog = $Result.DefaultSelection<Prisma.$ReservationChangeLogPayload>
/**
 * Model RoomStatusHistory
 * 
 */
export type RoomStatusHistory = $Result.DefaultSelection<Prisma.$RoomStatusHistoryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RoomStatus: {
  AVAILABLE: 'AVAILABLE',
  RESERVED: 'RESERVED',
  OCCUPIED: 'OCCUPIED',
  DIRTY: 'DIRTY',
  CLEANING: 'CLEANING',
  MAINTENANCE: 'MAINTENANCE',
  OUT_OF_SERVICE: 'OUT_OF_SERVICE'
};

export type RoomStatus = (typeof RoomStatus)[keyof typeof RoomStatus]


export const ReservationStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED',
  NO_SHOW: 'NO_SHOW'
};

export type ReservationStatus = (typeof ReservationStatus)[keyof typeof ReservationStatus]


export const ReservationSource: {
  ONLINE: 'ONLINE',
  WALK_IN: 'WALK_IN',
  PHONE: 'PHONE'
};

export type ReservationSource = (typeof ReservationSource)[keyof typeof ReservationSource]

}

export type RoomStatus = $Enums.RoomStatus

export const RoomStatus: typeof $Enums.RoomStatus

export type ReservationStatus = $Enums.ReservationStatus

export const ReservationStatus: typeof $Enums.ReservationStatus

export type ReservationSource = $Enums.ReservationSource

export const ReservationSource: typeof $Enums.ReservationSource

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more RoomTypes
 * const roomTypes = await prisma.roomType.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more RoomTypes
   * const roomTypes = await prisma.roomType.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.roomType`: Exposes CRUD operations for the **RoomType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomTypes
    * const roomTypes = await prisma.roomType.findMany()
    * ```
    */
  get roomType(): Prisma.RoomTypeDelegate<ExtArgs>;

  /**
   * `prisma.roomTypePhoto`: Exposes CRUD operations for the **RoomTypePhoto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomTypePhotos
    * const roomTypePhotos = await prisma.roomTypePhoto.findMany()
    * ```
    */
  get roomTypePhoto(): Prisma.RoomTypePhotoDelegate<ExtArgs>;

  /**
   * `prisma.room`: Exposes CRUD operations for the **Room** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rooms
    * const rooms = await prisma.room.findMany()
    * ```
    */
  get room(): Prisma.RoomDelegate<ExtArgs>;

  /**
   * `prisma.guest`: Exposes CRUD operations for the **Guest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Guests
    * const guests = await prisma.guest.findMany()
    * ```
    */
  get guest(): Prisma.GuestDelegate<ExtArgs>;

  /**
   * `prisma.reservation`: Exposes CRUD operations for the **Reservation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reservations
    * const reservations = await prisma.reservation.findMany()
    * ```
    */
  get reservation(): Prisma.ReservationDelegate<ExtArgs>;

  /**
   * `prisma.reservationStatusHistory`: Exposes CRUD operations for the **ReservationStatusHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReservationStatusHistories
    * const reservationStatusHistories = await prisma.reservationStatusHistory.findMany()
    * ```
    */
  get reservationStatusHistory(): Prisma.ReservationStatusHistoryDelegate<ExtArgs>;

  /**
   * `prisma.reservationChangeLog`: Exposes CRUD operations for the **ReservationChangeLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReservationChangeLogs
    * const reservationChangeLogs = await prisma.reservationChangeLog.findMany()
    * ```
    */
  get reservationChangeLog(): Prisma.ReservationChangeLogDelegate<ExtArgs>;

  /**
   * `prisma.roomStatusHistory`: Exposes CRUD operations for the **RoomStatusHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomStatusHistories
    * const roomStatusHistories = await prisma.roomStatusHistory.findMany()
    * ```
    */
  get roomStatusHistory(): Prisma.RoomStatusHistoryDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    RoomType: 'RoomType',
    RoomTypePhoto: 'RoomTypePhoto',
    Room: 'Room',
    Guest: 'Guest',
    Reservation: 'Reservation',
    ReservationStatusHistory: 'ReservationStatusHistory',
    ReservationChangeLog: 'ReservationChangeLog',
    RoomStatusHistory: 'RoomStatusHistory'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "roomType" | "roomTypePhoto" | "room" | "guest" | "reservation" | "reservationStatusHistory" | "reservationChangeLog" | "roomStatusHistory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      RoomType: {
        payload: Prisma.$RoomTypePayload<ExtArgs>
        fields: Prisma.RoomTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload>
          }
          findFirst: {
            args: Prisma.RoomTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload>
          }
          findMany: {
            args: Prisma.RoomTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload>[]
          }
          create: {
            args: Prisma.RoomTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload>
          }
          createMany: {
            args: Prisma.RoomTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload>[]
          }
          delete: {
            args: Prisma.RoomTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload>
          }
          update: {
            args: Prisma.RoomTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload>
          }
          deleteMany: {
            args: Prisma.RoomTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoomTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload>
          }
          aggregate: {
            args: Prisma.RoomTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomType>
          }
          groupBy: {
            args: Prisma.RoomTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomTypeCountArgs<ExtArgs>
            result: $Utils.Optional<RoomTypeCountAggregateOutputType> | number
          }
        }
      }
      RoomTypePhoto: {
        payload: Prisma.$RoomTypePhotoPayload<ExtArgs>
        fields: Prisma.RoomTypePhotoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomTypePhotoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePhotoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomTypePhotoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePhotoPayload>
          }
          findFirst: {
            args: Prisma.RoomTypePhotoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePhotoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomTypePhotoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePhotoPayload>
          }
          findMany: {
            args: Prisma.RoomTypePhotoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePhotoPayload>[]
          }
          create: {
            args: Prisma.RoomTypePhotoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePhotoPayload>
          }
          createMany: {
            args: Prisma.RoomTypePhotoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomTypePhotoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePhotoPayload>[]
          }
          delete: {
            args: Prisma.RoomTypePhotoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePhotoPayload>
          }
          update: {
            args: Prisma.RoomTypePhotoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePhotoPayload>
          }
          deleteMany: {
            args: Prisma.RoomTypePhotoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomTypePhotoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoomTypePhotoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePhotoPayload>
          }
          aggregate: {
            args: Prisma.RoomTypePhotoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomTypePhoto>
          }
          groupBy: {
            args: Prisma.RoomTypePhotoGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomTypePhotoGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomTypePhotoCountArgs<ExtArgs>
            result: $Utils.Optional<RoomTypePhotoCountAggregateOutputType> | number
          }
        }
      }
      Room: {
        payload: Prisma.$RoomPayload<ExtArgs>
        fields: Prisma.RoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findFirst: {
            args: Prisma.RoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findMany: {
            args: Prisma.RoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          create: {
            args: Prisma.RoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          createMany: {
            args: Prisma.RoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          delete: {
            args: Prisma.RoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          update: {
            args: Prisma.RoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          deleteMany: {
            args: Prisma.RoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          aggregate: {
            args: Prisma.RoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom>
          }
          groupBy: {
            args: Prisma.RoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomCountArgs<ExtArgs>
            result: $Utils.Optional<RoomCountAggregateOutputType> | number
          }
        }
      }
      Guest: {
        payload: Prisma.$GuestPayload<ExtArgs>
        fields: Prisma.GuestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GuestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GuestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          findFirst: {
            args: Prisma.GuestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GuestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          findMany: {
            args: Prisma.GuestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>[]
          }
          create: {
            args: Prisma.GuestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          createMany: {
            args: Prisma.GuestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GuestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>[]
          }
          delete: {
            args: Prisma.GuestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          update: {
            args: Prisma.GuestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          deleteMany: {
            args: Prisma.GuestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GuestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GuestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          aggregate: {
            args: Prisma.GuestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuest>
          }
          groupBy: {
            args: Prisma.GuestGroupByArgs<ExtArgs>
            result: $Utils.Optional<GuestGroupByOutputType>[]
          }
          count: {
            args: Prisma.GuestCountArgs<ExtArgs>
            result: $Utils.Optional<GuestCountAggregateOutputType> | number
          }
        }
      }
      Reservation: {
        payload: Prisma.$ReservationPayload<ExtArgs>
        fields: Prisma.ReservationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReservationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReservationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>
          }
          findFirst: {
            args: Prisma.ReservationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReservationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>
          }
          findMany: {
            args: Prisma.ReservationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>[]
          }
          create: {
            args: Prisma.ReservationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>
          }
          createMany: {
            args: Prisma.ReservationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReservationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>[]
          }
          delete: {
            args: Prisma.ReservationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>
          }
          update: {
            args: Prisma.ReservationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>
          }
          deleteMany: {
            args: Prisma.ReservationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReservationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReservationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>
          }
          aggregate: {
            args: Prisma.ReservationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReservation>
          }
          groupBy: {
            args: Prisma.ReservationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReservationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReservationCountArgs<ExtArgs>
            result: $Utils.Optional<ReservationCountAggregateOutputType> | number
          }
        }
      }
      ReservationStatusHistory: {
        payload: Prisma.$ReservationStatusHistoryPayload<ExtArgs>
        fields: Prisma.ReservationStatusHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReservationStatusHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationStatusHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReservationStatusHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationStatusHistoryPayload>
          }
          findFirst: {
            args: Prisma.ReservationStatusHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationStatusHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReservationStatusHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationStatusHistoryPayload>
          }
          findMany: {
            args: Prisma.ReservationStatusHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationStatusHistoryPayload>[]
          }
          create: {
            args: Prisma.ReservationStatusHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationStatusHistoryPayload>
          }
          createMany: {
            args: Prisma.ReservationStatusHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReservationStatusHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationStatusHistoryPayload>[]
          }
          delete: {
            args: Prisma.ReservationStatusHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationStatusHistoryPayload>
          }
          update: {
            args: Prisma.ReservationStatusHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationStatusHistoryPayload>
          }
          deleteMany: {
            args: Prisma.ReservationStatusHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReservationStatusHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReservationStatusHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationStatusHistoryPayload>
          }
          aggregate: {
            args: Prisma.ReservationStatusHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReservationStatusHistory>
          }
          groupBy: {
            args: Prisma.ReservationStatusHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReservationStatusHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReservationStatusHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<ReservationStatusHistoryCountAggregateOutputType> | number
          }
        }
      }
      ReservationChangeLog: {
        payload: Prisma.$ReservationChangeLogPayload<ExtArgs>
        fields: Prisma.ReservationChangeLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReservationChangeLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationChangeLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReservationChangeLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationChangeLogPayload>
          }
          findFirst: {
            args: Prisma.ReservationChangeLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationChangeLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReservationChangeLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationChangeLogPayload>
          }
          findMany: {
            args: Prisma.ReservationChangeLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationChangeLogPayload>[]
          }
          create: {
            args: Prisma.ReservationChangeLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationChangeLogPayload>
          }
          createMany: {
            args: Prisma.ReservationChangeLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReservationChangeLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationChangeLogPayload>[]
          }
          delete: {
            args: Prisma.ReservationChangeLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationChangeLogPayload>
          }
          update: {
            args: Prisma.ReservationChangeLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationChangeLogPayload>
          }
          deleteMany: {
            args: Prisma.ReservationChangeLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReservationChangeLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReservationChangeLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationChangeLogPayload>
          }
          aggregate: {
            args: Prisma.ReservationChangeLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReservationChangeLog>
          }
          groupBy: {
            args: Prisma.ReservationChangeLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReservationChangeLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReservationChangeLogCountArgs<ExtArgs>
            result: $Utils.Optional<ReservationChangeLogCountAggregateOutputType> | number
          }
        }
      }
      RoomStatusHistory: {
        payload: Prisma.$RoomStatusHistoryPayload<ExtArgs>
        fields: Prisma.RoomStatusHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomStatusHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomStatusHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusHistoryPayload>
          }
          findFirst: {
            args: Prisma.RoomStatusHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomStatusHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusHistoryPayload>
          }
          findMany: {
            args: Prisma.RoomStatusHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusHistoryPayload>[]
          }
          create: {
            args: Prisma.RoomStatusHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusHistoryPayload>
          }
          createMany: {
            args: Prisma.RoomStatusHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomStatusHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusHistoryPayload>[]
          }
          delete: {
            args: Prisma.RoomStatusHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusHistoryPayload>
          }
          update: {
            args: Prisma.RoomStatusHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusHistoryPayload>
          }
          deleteMany: {
            args: Prisma.RoomStatusHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomStatusHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoomStatusHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusHistoryPayload>
          }
          aggregate: {
            args: Prisma.RoomStatusHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomStatusHistory>
          }
          groupBy: {
            args: Prisma.RoomStatusHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomStatusHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomStatusHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<RoomStatusHistoryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type RoomTypeCountOutputType
   */

  export type RoomTypeCountOutputType = {
    rooms: number
    reservations: number
    photos: number
  }

  export type RoomTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rooms?: boolean | RoomTypeCountOutputTypeCountRoomsArgs
    reservations?: boolean | RoomTypeCountOutputTypeCountReservationsArgs
    photos?: boolean | RoomTypeCountOutputTypeCountPhotosArgs
  }

  // Custom InputTypes
  /**
   * RoomTypeCountOutputType without action
   */
  export type RoomTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypeCountOutputType
     */
    select?: RoomTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomTypeCountOutputType without action
   */
  export type RoomTypeCountOutputTypeCountRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
  }

  /**
   * RoomTypeCountOutputType without action
   */
  export type RoomTypeCountOutputTypeCountReservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReservationWhereInput
  }

  /**
   * RoomTypeCountOutputType without action
   */
  export type RoomTypeCountOutputTypeCountPhotosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomTypePhotoWhereInput
  }


  /**
   * Count Type RoomCountOutputType
   */

  export type RoomCountOutputType = {
    reservations: number
    history: number
  }

  export type RoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservations?: boolean | RoomCountOutputTypeCountReservationsArgs
    history?: boolean | RoomCountOutputTypeCountHistoryArgs
  }

  // Custom InputTypes
  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomCountOutputType
     */
    select?: RoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountReservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReservationWhereInput
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomStatusHistoryWhereInput
  }


  /**
   * Count Type GuestCountOutputType
   */

  export type GuestCountOutputType = {
    reservations: number
  }

  export type GuestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservations?: boolean | GuestCountOutputTypeCountReservationsArgs
  }

  // Custom InputTypes
  /**
   * GuestCountOutputType without action
   */
  export type GuestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestCountOutputType
     */
    select?: GuestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GuestCountOutputType without action
   */
  export type GuestCountOutputTypeCountReservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReservationWhereInput
  }


  /**
   * Count Type ReservationCountOutputType
   */

  export type ReservationCountOutputType = {
    history: number
    changeLog: number
  }

  export type ReservationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    history?: boolean | ReservationCountOutputTypeCountHistoryArgs
    changeLog?: boolean | ReservationCountOutputTypeCountChangeLogArgs
  }

  // Custom InputTypes
  /**
   * ReservationCountOutputType without action
   */
  export type ReservationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationCountOutputType
     */
    select?: ReservationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReservationCountOutputType without action
   */
  export type ReservationCountOutputTypeCountHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReservationStatusHistoryWhereInput
  }

  /**
   * ReservationCountOutputType without action
   */
  export type ReservationCountOutputTypeCountChangeLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReservationChangeLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model RoomType
   */

  export type AggregateRoomType = {
    _count: RoomTypeCountAggregateOutputType | null
    _avg: RoomTypeAvgAggregateOutputType | null
    _sum: RoomTypeSumAggregateOutputType | null
    _min: RoomTypeMinAggregateOutputType | null
    _max: RoomTypeMaxAggregateOutputType | null
  }

  export type RoomTypeAvgAggregateOutputType = {
    basePrice: number | null
    maxGuests: number | null
  }

  export type RoomTypeSumAggregateOutputType = {
    basePrice: number | null
    maxGuests: number | null
  }

  export type RoomTypeMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    basePrice: number | null
    maxGuests: number | null
    bedType: string | null
    isActive: boolean | null
  }

  export type RoomTypeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    basePrice: number | null
    maxGuests: number | null
    bedType: string | null
    isActive: boolean | null
  }

  export type RoomTypeCountAggregateOutputType = {
    id: number
    name: number
    description: number
    basePrice: number
    maxGuests: number
    bedType: number
    amenities: number
    isActive: number
    _all: number
  }


  export type RoomTypeAvgAggregateInputType = {
    basePrice?: true
    maxGuests?: true
  }

  export type RoomTypeSumAggregateInputType = {
    basePrice?: true
    maxGuests?: true
  }

  export type RoomTypeMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    basePrice?: true
    maxGuests?: true
    bedType?: true
    isActive?: true
  }

  export type RoomTypeMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    basePrice?: true
    maxGuests?: true
    bedType?: true
    isActive?: true
  }

  export type RoomTypeCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    basePrice?: true
    maxGuests?: true
    bedType?: true
    amenities?: true
    isActive?: true
    _all?: true
  }

  export type RoomTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomType to aggregate.
     */
    where?: RoomTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomTypes to fetch.
     */
    orderBy?: RoomTypeOrderByWithRelationInput | RoomTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomTypes
    **/
    _count?: true | RoomTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomTypeMaxAggregateInputType
  }

  export type GetRoomTypeAggregateType<T extends RoomTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomType[P]>
      : GetScalarType<T[P], AggregateRoomType[P]>
  }




  export type RoomTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomTypeWhereInput
    orderBy?: RoomTypeOrderByWithAggregationInput | RoomTypeOrderByWithAggregationInput[]
    by: RoomTypeScalarFieldEnum[] | RoomTypeScalarFieldEnum
    having?: RoomTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomTypeCountAggregateInputType | true
    _avg?: RoomTypeAvgAggregateInputType
    _sum?: RoomTypeSumAggregateInputType
    _min?: RoomTypeMinAggregateInputType
    _max?: RoomTypeMaxAggregateInputType
  }

  export type RoomTypeGroupByOutputType = {
    id: string
    name: string
    description: string | null
    basePrice: number
    maxGuests: number
    bedType: string | null
    amenities: JsonValue | null
    isActive: boolean
    _count: RoomTypeCountAggregateOutputType | null
    _avg: RoomTypeAvgAggregateOutputType | null
    _sum: RoomTypeSumAggregateOutputType | null
    _min: RoomTypeMinAggregateOutputType | null
    _max: RoomTypeMaxAggregateOutputType | null
  }

  type GetRoomTypeGroupByPayload<T extends RoomTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomTypeGroupByOutputType[P]>
            : GetScalarType<T[P], RoomTypeGroupByOutputType[P]>
        }
      >
    >


  export type RoomTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    basePrice?: boolean
    maxGuests?: boolean
    bedType?: boolean
    amenities?: boolean
    isActive?: boolean
    rooms?: boolean | RoomType$roomsArgs<ExtArgs>
    reservations?: boolean | RoomType$reservationsArgs<ExtArgs>
    photos?: boolean | RoomType$photosArgs<ExtArgs>
    _count?: boolean | RoomTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomType"]>

  export type RoomTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    basePrice?: boolean
    maxGuests?: boolean
    bedType?: boolean
    amenities?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["roomType"]>

  export type RoomTypeSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    basePrice?: boolean
    maxGuests?: boolean
    bedType?: boolean
    amenities?: boolean
    isActive?: boolean
  }

  export type RoomTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rooms?: boolean | RoomType$roomsArgs<ExtArgs>
    reservations?: boolean | RoomType$reservationsArgs<ExtArgs>
    photos?: boolean | RoomType$photosArgs<ExtArgs>
    _count?: boolean | RoomTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoomTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RoomTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomType"
    objects: {
      rooms: Prisma.$RoomPayload<ExtArgs>[]
      reservations: Prisma.$ReservationPayload<ExtArgs>[]
      photos: Prisma.$RoomTypePhotoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      basePrice: number
      maxGuests: number
      bedType: string | null
      amenities: Prisma.JsonValue | null
      isActive: boolean
    }, ExtArgs["result"]["roomType"]>
    composites: {}
  }

  type RoomTypeGetPayload<S extends boolean | null | undefined | RoomTypeDefaultArgs> = $Result.GetResult<Prisma.$RoomTypePayload, S>

  type RoomTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RoomTypeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RoomTypeCountAggregateInputType | true
    }

  export interface RoomTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomType'], meta: { name: 'RoomType' } }
    /**
     * Find zero or one RoomType that matches the filter.
     * @param {RoomTypeFindUniqueArgs} args - Arguments to find a RoomType
     * @example
     * // Get one RoomType
     * const roomType = await prisma.roomType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomTypeFindUniqueArgs>(args: SelectSubset<T, RoomTypeFindUniqueArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RoomType that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RoomTypeFindUniqueOrThrowArgs} args - Arguments to find a RoomType
     * @example
     * // Get one RoomType
     * const roomType = await prisma.roomType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RoomType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeFindFirstArgs} args - Arguments to find a RoomType
     * @example
     * // Get one RoomType
     * const roomType = await prisma.roomType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomTypeFindFirstArgs>(args?: SelectSubset<T, RoomTypeFindFirstArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RoomType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeFindFirstOrThrowArgs} args - Arguments to find a RoomType
     * @example
     * // Get one RoomType
     * const roomType = await prisma.roomType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RoomTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomTypes
     * const roomTypes = await prisma.roomType.findMany()
     * 
     * // Get first 10 RoomTypes
     * const roomTypes = await prisma.roomType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomTypeWithIdOnly = await prisma.roomType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomTypeFindManyArgs>(args?: SelectSubset<T, RoomTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RoomType.
     * @param {RoomTypeCreateArgs} args - Arguments to create a RoomType.
     * @example
     * // Create one RoomType
     * const RoomType = await prisma.roomType.create({
     *   data: {
     *     // ... data to create a RoomType
     *   }
     * })
     * 
     */
    create<T extends RoomTypeCreateArgs>(args: SelectSubset<T, RoomTypeCreateArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RoomTypes.
     * @param {RoomTypeCreateManyArgs} args - Arguments to create many RoomTypes.
     * @example
     * // Create many RoomTypes
     * const roomType = await prisma.roomType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomTypeCreateManyArgs>(args?: SelectSubset<T, RoomTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomTypes and returns the data saved in the database.
     * @param {RoomTypeCreateManyAndReturnArgs} args - Arguments to create many RoomTypes.
     * @example
     * // Create many RoomTypes
     * const roomType = await prisma.roomType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomTypes and only return the `id`
     * const roomTypeWithIdOnly = await prisma.roomType.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RoomType.
     * @param {RoomTypeDeleteArgs} args - Arguments to delete one RoomType.
     * @example
     * // Delete one RoomType
     * const RoomType = await prisma.roomType.delete({
     *   where: {
     *     // ... filter to delete one RoomType
     *   }
     * })
     * 
     */
    delete<T extends RoomTypeDeleteArgs>(args: SelectSubset<T, RoomTypeDeleteArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RoomType.
     * @param {RoomTypeUpdateArgs} args - Arguments to update one RoomType.
     * @example
     * // Update one RoomType
     * const roomType = await prisma.roomType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomTypeUpdateArgs>(args: SelectSubset<T, RoomTypeUpdateArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RoomTypes.
     * @param {RoomTypeDeleteManyArgs} args - Arguments to filter RoomTypes to delete.
     * @example
     * // Delete a few RoomTypes
     * const { count } = await prisma.roomType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomTypeDeleteManyArgs>(args?: SelectSubset<T, RoomTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomTypes
     * const roomType = await prisma.roomType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomTypeUpdateManyArgs>(args: SelectSubset<T, RoomTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RoomType.
     * @param {RoomTypeUpsertArgs} args - Arguments to update or create a RoomType.
     * @example
     * // Update or create a RoomType
     * const roomType = await prisma.roomType.upsert({
     *   create: {
     *     // ... data to create a RoomType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomType we want to update
     *   }
     * })
     */
    upsert<T extends RoomTypeUpsertArgs>(args: SelectSubset<T, RoomTypeUpsertArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RoomTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeCountArgs} args - Arguments to filter RoomTypes to count.
     * @example
     * // Count the number of RoomTypes
     * const count = await prisma.roomType.count({
     *   where: {
     *     // ... the filter for the RoomTypes we want to count
     *   }
     * })
    **/
    count<T extends RoomTypeCountArgs>(
      args?: Subset<T, RoomTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomTypeAggregateArgs>(args: Subset<T, RoomTypeAggregateArgs>): Prisma.PrismaPromise<GetRoomTypeAggregateType<T>>

    /**
     * Group by RoomType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomTypeGroupByArgs['orderBy'] }
        : { orderBy?: RoomTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomType model
   */
  readonly fields: RoomTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rooms<T extends RoomType$roomsArgs<ExtArgs> = {}>(args?: Subset<T, RoomType$roomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany"> | Null>
    reservations<T extends RoomType$reservationsArgs<ExtArgs> = {}>(args?: Subset<T, RoomType$reservationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findMany"> | Null>
    photos<T extends RoomType$photosArgs<ExtArgs> = {}>(args?: Subset<T, RoomType$photosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomTypePhotoPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoomType model
   */ 
  interface RoomTypeFieldRefs {
    readonly id: FieldRef<"RoomType", 'String'>
    readonly name: FieldRef<"RoomType", 'String'>
    readonly description: FieldRef<"RoomType", 'String'>
    readonly basePrice: FieldRef<"RoomType", 'Int'>
    readonly maxGuests: FieldRef<"RoomType", 'Int'>
    readonly bedType: FieldRef<"RoomType", 'String'>
    readonly amenities: FieldRef<"RoomType", 'Json'>
    readonly isActive: FieldRef<"RoomType", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * RoomType findUnique
   */
  export type RoomTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    /**
     * Filter, which RoomType to fetch.
     */
    where: RoomTypeWhereUniqueInput
  }

  /**
   * RoomType findUniqueOrThrow
   */
  export type RoomTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    /**
     * Filter, which RoomType to fetch.
     */
    where: RoomTypeWhereUniqueInput
  }

  /**
   * RoomType findFirst
   */
  export type RoomTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    /**
     * Filter, which RoomType to fetch.
     */
    where?: RoomTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomTypes to fetch.
     */
    orderBy?: RoomTypeOrderByWithRelationInput | RoomTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomTypes.
     */
    cursor?: RoomTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomTypes.
     */
    distinct?: RoomTypeScalarFieldEnum | RoomTypeScalarFieldEnum[]
  }

  /**
   * RoomType findFirstOrThrow
   */
  export type RoomTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    /**
     * Filter, which RoomType to fetch.
     */
    where?: RoomTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomTypes to fetch.
     */
    orderBy?: RoomTypeOrderByWithRelationInput | RoomTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomTypes.
     */
    cursor?: RoomTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomTypes.
     */
    distinct?: RoomTypeScalarFieldEnum | RoomTypeScalarFieldEnum[]
  }

  /**
   * RoomType findMany
   */
  export type RoomTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    /**
     * Filter, which RoomTypes to fetch.
     */
    where?: RoomTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomTypes to fetch.
     */
    orderBy?: RoomTypeOrderByWithRelationInput | RoomTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomTypes.
     */
    cursor?: RoomTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomTypes.
     */
    skip?: number
    distinct?: RoomTypeScalarFieldEnum | RoomTypeScalarFieldEnum[]
  }

  /**
   * RoomType create
   */
  export type RoomTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomType.
     */
    data: XOR<RoomTypeCreateInput, RoomTypeUncheckedCreateInput>
  }

  /**
   * RoomType createMany
   */
  export type RoomTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomTypes.
     */
    data: RoomTypeCreateManyInput | RoomTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomType createManyAndReturn
   */
  export type RoomTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RoomTypes.
     */
    data: RoomTypeCreateManyInput | RoomTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomType update
   */
  export type RoomTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomType.
     */
    data: XOR<RoomTypeUpdateInput, RoomTypeUncheckedUpdateInput>
    /**
     * Choose, which RoomType to update.
     */
    where: RoomTypeWhereUniqueInput
  }

  /**
   * RoomType updateMany
   */
  export type RoomTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomTypes.
     */
    data: XOR<RoomTypeUpdateManyMutationInput, RoomTypeUncheckedUpdateManyInput>
    /**
     * Filter which RoomTypes to update
     */
    where?: RoomTypeWhereInput
  }

  /**
   * RoomType upsert
   */
  export type RoomTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomType to update in case it exists.
     */
    where: RoomTypeWhereUniqueInput
    /**
     * In case the RoomType found by the `where` argument doesn't exist, create a new RoomType with this data.
     */
    create: XOR<RoomTypeCreateInput, RoomTypeUncheckedCreateInput>
    /**
     * In case the RoomType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomTypeUpdateInput, RoomTypeUncheckedUpdateInput>
  }

  /**
   * RoomType delete
   */
  export type RoomTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    /**
     * Filter which RoomType to delete.
     */
    where: RoomTypeWhereUniqueInput
  }

  /**
   * RoomType deleteMany
   */
  export type RoomTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomTypes to delete
     */
    where?: RoomTypeWhereInput
  }

  /**
   * RoomType.rooms
   */
  export type RoomType$roomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    cursor?: RoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * RoomType.reservations
   */
  export type RoomType$reservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    where?: ReservationWhereInput
    orderBy?: ReservationOrderByWithRelationInput | ReservationOrderByWithRelationInput[]
    cursor?: ReservationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * RoomType.photos
   */
  export type RoomType$photosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypePhoto
     */
    select?: RoomTypePhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypePhotoInclude<ExtArgs> | null
    where?: RoomTypePhotoWhereInput
    orderBy?: RoomTypePhotoOrderByWithRelationInput | RoomTypePhotoOrderByWithRelationInput[]
    cursor?: RoomTypePhotoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomTypePhotoScalarFieldEnum | RoomTypePhotoScalarFieldEnum[]
  }

  /**
   * RoomType without action
   */
  export type RoomTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
  }


  /**
   * Model RoomTypePhoto
   */

  export type AggregateRoomTypePhoto = {
    _count: RoomTypePhotoCountAggregateOutputType | null
    _min: RoomTypePhotoMinAggregateOutputType | null
    _max: RoomTypePhotoMaxAggregateOutputType | null
  }

  export type RoomTypePhotoMinAggregateOutputType = {
    id: string | null
    roomTypeId: string | null
    filename: string | null
    url: string | null
    uploadedAt: Date | null
  }

  export type RoomTypePhotoMaxAggregateOutputType = {
    id: string | null
    roomTypeId: string | null
    filename: string | null
    url: string | null
    uploadedAt: Date | null
  }

  export type RoomTypePhotoCountAggregateOutputType = {
    id: number
    roomTypeId: number
    filename: number
    url: number
    uploadedAt: number
    _all: number
  }


  export type RoomTypePhotoMinAggregateInputType = {
    id?: true
    roomTypeId?: true
    filename?: true
    url?: true
    uploadedAt?: true
  }

  export type RoomTypePhotoMaxAggregateInputType = {
    id?: true
    roomTypeId?: true
    filename?: true
    url?: true
    uploadedAt?: true
  }

  export type RoomTypePhotoCountAggregateInputType = {
    id?: true
    roomTypeId?: true
    filename?: true
    url?: true
    uploadedAt?: true
    _all?: true
  }

  export type RoomTypePhotoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomTypePhoto to aggregate.
     */
    where?: RoomTypePhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomTypePhotos to fetch.
     */
    orderBy?: RoomTypePhotoOrderByWithRelationInput | RoomTypePhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomTypePhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomTypePhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomTypePhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomTypePhotos
    **/
    _count?: true | RoomTypePhotoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomTypePhotoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomTypePhotoMaxAggregateInputType
  }

  export type GetRoomTypePhotoAggregateType<T extends RoomTypePhotoAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomTypePhoto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomTypePhoto[P]>
      : GetScalarType<T[P], AggregateRoomTypePhoto[P]>
  }




  export type RoomTypePhotoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomTypePhotoWhereInput
    orderBy?: RoomTypePhotoOrderByWithAggregationInput | RoomTypePhotoOrderByWithAggregationInput[]
    by: RoomTypePhotoScalarFieldEnum[] | RoomTypePhotoScalarFieldEnum
    having?: RoomTypePhotoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomTypePhotoCountAggregateInputType | true
    _min?: RoomTypePhotoMinAggregateInputType
    _max?: RoomTypePhotoMaxAggregateInputType
  }

  export type RoomTypePhotoGroupByOutputType = {
    id: string
    roomTypeId: string
    filename: string
    url: string
    uploadedAt: Date
    _count: RoomTypePhotoCountAggregateOutputType | null
    _min: RoomTypePhotoMinAggregateOutputType | null
    _max: RoomTypePhotoMaxAggregateOutputType | null
  }

  type GetRoomTypePhotoGroupByPayload<T extends RoomTypePhotoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomTypePhotoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomTypePhotoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomTypePhotoGroupByOutputType[P]>
            : GetScalarType<T[P], RoomTypePhotoGroupByOutputType[P]>
        }
      >
    >


  export type RoomTypePhotoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomTypeId?: boolean
    filename?: boolean
    url?: boolean
    uploadedAt?: boolean
    roomType?: boolean | RoomTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomTypePhoto"]>

  export type RoomTypePhotoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomTypeId?: boolean
    filename?: boolean
    url?: boolean
    uploadedAt?: boolean
    roomType?: boolean | RoomTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomTypePhoto"]>

  export type RoomTypePhotoSelectScalar = {
    id?: boolean
    roomTypeId?: boolean
    filename?: boolean
    url?: boolean
    uploadedAt?: boolean
  }

  export type RoomTypePhotoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomType?: boolean | RoomTypeDefaultArgs<ExtArgs>
  }
  export type RoomTypePhotoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomType?: boolean | RoomTypeDefaultArgs<ExtArgs>
  }

  export type $RoomTypePhotoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomTypePhoto"
    objects: {
      roomType: Prisma.$RoomTypePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomTypeId: string
      filename: string
      url: string
      uploadedAt: Date
    }, ExtArgs["result"]["roomTypePhoto"]>
    composites: {}
  }

  type RoomTypePhotoGetPayload<S extends boolean | null | undefined | RoomTypePhotoDefaultArgs> = $Result.GetResult<Prisma.$RoomTypePhotoPayload, S>

  type RoomTypePhotoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RoomTypePhotoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RoomTypePhotoCountAggregateInputType | true
    }

  export interface RoomTypePhotoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomTypePhoto'], meta: { name: 'RoomTypePhoto' } }
    /**
     * Find zero or one RoomTypePhoto that matches the filter.
     * @param {RoomTypePhotoFindUniqueArgs} args - Arguments to find a RoomTypePhoto
     * @example
     * // Get one RoomTypePhoto
     * const roomTypePhoto = await prisma.roomTypePhoto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomTypePhotoFindUniqueArgs>(args: SelectSubset<T, RoomTypePhotoFindUniqueArgs<ExtArgs>>): Prisma__RoomTypePhotoClient<$Result.GetResult<Prisma.$RoomTypePhotoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RoomTypePhoto that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RoomTypePhotoFindUniqueOrThrowArgs} args - Arguments to find a RoomTypePhoto
     * @example
     * // Get one RoomTypePhoto
     * const roomTypePhoto = await prisma.roomTypePhoto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomTypePhotoFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomTypePhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomTypePhotoClient<$Result.GetResult<Prisma.$RoomTypePhotoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RoomTypePhoto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypePhotoFindFirstArgs} args - Arguments to find a RoomTypePhoto
     * @example
     * // Get one RoomTypePhoto
     * const roomTypePhoto = await prisma.roomTypePhoto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomTypePhotoFindFirstArgs>(args?: SelectSubset<T, RoomTypePhotoFindFirstArgs<ExtArgs>>): Prisma__RoomTypePhotoClient<$Result.GetResult<Prisma.$RoomTypePhotoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RoomTypePhoto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypePhotoFindFirstOrThrowArgs} args - Arguments to find a RoomTypePhoto
     * @example
     * // Get one RoomTypePhoto
     * const roomTypePhoto = await prisma.roomTypePhoto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomTypePhotoFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomTypePhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomTypePhotoClient<$Result.GetResult<Prisma.$RoomTypePhotoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RoomTypePhotos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypePhotoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomTypePhotos
     * const roomTypePhotos = await prisma.roomTypePhoto.findMany()
     * 
     * // Get first 10 RoomTypePhotos
     * const roomTypePhotos = await prisma.roomTypePhoto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomTypePhotoWithIdOnly = await prisma.roomTypePhoto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomTypePhotoFindManyArgs>(args?: SelectSubset<T, RoomTypePhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomTypePhotoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RoomTypePhoto.
     * @param {RoomTypePhotoCreateArgs} args - Arguments to create a RoomTypePhoto.
     * @example
     * // Create one RoomTypePhoto
     * const RoomTypePhoto = await prisma.roomTypePhoto.create({
     *   data: {
     *     // ... data to create a RoomTypePhoto
     *   }
     * })
     * 
     */
    create<T extends RoomTypePhotoCreateArgs>(args: SelectSubset<T, RoomTypePhotoCreateArgs<ExtArgs>>): Prisma__RoomTypePhotoClient<$Result.GetResult<Prisma.$RoomTypePhotoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RoomTypePhotos.
     * @param {RoomTypePhotoCreateManyArgs} args - Arguments to create many RoomTypePhotos.
     * @example
     * // Create many RoomTypePhotos
     * const roomTypePhoto = await prisma.roomTypePhoto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomTypePhotoCreateManyArgs>(args?: SelectSubset<T, RoomTypePhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomTypePhotos and returns the data saved in the database.
     * @param {RoomTypePhotoCreateManyAndReturnArgs} args - Arguments to create many RoomTypePhotos.
     * @example
     * // Create many RoomTypePhotos
     * const roomTypePhoto = await prisma.roomTypePhoto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomTypePhotos and only return the `id`
     * const roomTypePhotoWithIdOnly = await prisma.roomTypePhoto.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomTypePhotoCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomTypePhotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomTypePhotoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RoomTypePhoto.
     * @param {RoomTypePhotoDeleteArgs} args - Arguments to delete one RoomTypePhoto.
     * @example
     * // Delete one RoomTypePhoto
     * const RoomTypePhoto = await prisma.roomTypePhoto.delete({
     *   where: {
     *     // ... filter to delete one RoomTypePhoto
     *   }
     * })
     * 
     */
    delete<T extends RoomTypePhotoDeleteArgs>(args: SelectSubset<T, RoomTypePhotoDeleteArgs<ExtArgs>>): Prisma__RoomTypePhotoClient<$Result.GetResult<Prisma.$RoomTypePhotoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RoomTypePhoto.
     * @param {RoomTypePhotoUpdateArgs} args - Arguments to update one RoomTypePhoto.
     * @example
     * // Update one RoomTypePhoto
     * const roomTypePhoto = await prisma.roomTypePhoto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomTypePhotoUpdateArgs>(args: SelectSubset<T, RoomTypePhotoUpdateArgs<ExtArgs>>): Prisma__RoomTypePhotoClient<$Result.GetResult<Prisma.$RoomTypePhotoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RoomTypePhotos.
     * @param {RoomTypePhotoDeleteManyArgs} args - Arguments to filter RoomTypePhotos to delete.
     * @example
     * // Delete a few RoomTypePhotos
     * const { count } = await prisma.roomTypePhoto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomTypePhotoDeleteManyArgs>(args?: SelectSubset<T, RoomTypePhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomTypePhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypePhotoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomTypePhotos
     * const roomTypePhoto = await prisma.roomTypePhoto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomTypePhotoUpdateManyArgs>(args: SelectSubset<T, RoomTypePhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RoomTypePhoto.
     * @param {RoomTypePhotoUpsertArgs} args - Arguments to update or create a RoomTypePhoto.
     * @example
     * // Update or create a RoomTypePhoto
     * const roomTypePhoto = await prisma.roomTypePhoto.upsert({
     *   create: {
     *     // ... data to create a RoomTypePhoto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomTypePhoto we want to update
     *   }
     * })
     */
    upsert<T extends RoomTypePhotoUpsertArgs>(args: SelectSubset<T, RoomTypePhotoUpsertArgs<ExtArgs>>): Prisma__RoomTypePhotoClient<$Result.GetResult<Prisma.$RoomTypePhotoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RoomTypePhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypePhotoCountArgs} args - Arguments to filter RoomTypePhotos to count.
     * @example
     * // Count the number of RoomTypePhotos
     * const count = await prisma.roomTypePhoto.count({
     *   where: {
     *     // ... the filter for the RoomTypePhotos we want to count
     *   }
     * })
    **/
    count<T extends RoomTypePhotoCountArgs>(
      args?: Subset<T, RoomTypePhotoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomTypePhotoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomTypePhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypePhotoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomTypePhotoAggregateArgs>(args: Subset<T, RoomTypePhotoAggregateArgs>): Prisma.PrismaPromise<GetRoomTypePhotoAggregateType<T>>

    /**
     * Group by RoomTypePhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypePhotoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomTypePhotoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomTypePhotoGroupByArgs['orderBy'] }
        : { orderBy?: RoomTypePhotoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomTypePhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomTypePhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomTypePhoto model
   */
  readonly fields: RoomTypePhotoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomTypePhoto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomTypePhotoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roomType<T extends RoomTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomTypeDefaultArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoomTypePhoto model
   */ 
  interface RoomTypePhotoFieldRefs {
    readonly id: FieldRef<"RoomTypePhoto", 'String'>
    readonly roomTypeId: FieldRef<"RoomTypePhoto", 'String'>
    readonly filename: FieldRef<"RoomTypePhoto", 'String'>
    readonly url: FieldRef<"RoomTypePhoto", 'String'>
    readonly uploadedAt: FieldRef<"RoomTypePhoto", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoomTypePhoto findUnique
   */
  export type RoomTypePhotoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypePhoto
     */
    select?: RoomTypePhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypePhotoInclude<ExtArgs> | null
    /**
     * Filter, which RoomTypePhoto to fetch.
     */
    where: RoomTypePhotoWhereUniqueInput
  }

  /**
   * RoomTypePhoto findUniqueOrThrow
   */
  export type RoomTypePhotoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypePhoto
     */
    select?: RoomTypePhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypePhotoInclude<ExtArgs> | null
    /**
     * Filter, which RoomTypePhoto to fetch.
     */
    where: RoomTypePhotoWhereUniqueInput
  }

  /**
   * RoomTypePhoto findFirst
   */
  export type RoomTypePhotoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypePhoto
     */
    select?: RoomTypePhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypePhotoInclude<ExtArgs> | null
    /**
     * Filter, which RoomTypePhoto to fetch.
     */
    where?: RoomTypePhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomTypePhotos to fetch.
     */
    orderBy?: RoomTypePhotoOrderByWithRelationInput | RoomTypePhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomTypePhotos.
     */
    cursor?: RoomTypePhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomTypePhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomTypePhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomTypePhotos.
     */
    distinct?: RoomTypePhotoScalarFieldEnum | RoomTypePhotoScalarFieldEnum[]
  }

  /**
   * RoomTypePhoto findFirstOrThrow
   */
  export type RoomTypePhotoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypePhoto
     */
    select?: RoomTypePhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypePhotoInclude<ExtArgs> | null
    /**
     * Filter, which RoomTypePhoto to fetch.
     */
    where?: RoomTypePhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomTypePhotos to fetch.
     */
    orderBy?: RoomTypePhotoOrderByWithRelationInput | RoomTypePhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomTypePhotos.
     */
    cursor?: RoomTypePhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomTypePhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomTypePhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomTypePhotos.
     */
    distinct?: RoomTypePhotoScalarFieldEnum | RoomTypePhotoScalarFieldEnum[]
  }

  /**
   * RoomTypePhoto findMany
   */
  export type RoomTypePhotoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypePhoto
     */
    select?: RoomTypePhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypePhotoInclude<ExtArgs> | null
    /**
     * Filter, which RoomTypePhotos to fetch.
     */
    where?: RoomTypePhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomTypePhotos to fetch.
     */
    orderBy?: RoomTypePhotoOrderByWithRelationInput | RoomTypePhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomTypePhotos.
     */
    cursor?: RoomTypePhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomTypePhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomTypePhotos.
     */
    skip?: number
    distinct?: RoomTypePhotoScalarFieldEnum | RoomTypePhotoScalarFieldEnum[]
  }

  /**
   * RoomTypePhoto create
   */
  export type RoomTypePhotoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypePhoto
     */
    select?: RoomTypePhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypePhotoInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomTypePhoto.
     */
    data: XOR<RoomTypePhotoCreateInput, RoomTypePhotoUncheckedCreateInput>
  }

  /**
   * RoomTypePhoto createMany
   */
  export type RoomTypePhotoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomTypePhotos.
     */
    data: RoomTypePhotoCreateManyInput | RoomTypePhotoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomTypePhoto createManyAndReturn
   */
  export type RoomTypePhotoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypePhoto
     */
    select?: RoomTypePhotoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RoomTypePhotos.
     */
    data: RoomTypePhotoCreateManyInput | RoomTypePhotoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypePhotoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomTypePhoto update
   */
  export type RoomTypePhotoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypePhoto
     */
    select?: RoomTypePhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypePhotoInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomTypePhoto.
     */
    data: XOR<RoomTypePhotoUpdateInput, RoomTypePhotoUncheckedUpdateInput>
    /**
     * Choose, which RoomTypePhoto to update.
     */
    where: RoomTypePhotoWhereUniqueInput
  }

  /**
   * RoomTypePhoto updateMany
   */
  export type RoomTypePhotoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomTypePhotos.
     */
    data: XOR<RoomTypePhotoUpdateManyMutationInput, RoomTypePhotoUncheckedUpdateManyInput>
    /**
     * Filter which RoomTypePhotos to update
     */
    where?: RoomTypePhotoWhereInput
  }

  /**
   * RoomTypePhoto upsert
   */
  export type RoomTypePhotoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypePhoto
     */
    select?: RoomTypePhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypePhotoInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomTypePhoto to update in case it exists.
     */
    where: RoomTypePhotoWhereUniqueInput
    /**
     * In case the RoomTypePhoto found by the `where` argument doesn't exist, create a new RoomTypePhoto with this data.
     */
    create: XOR<RoomTypePhotoCreateInput, RoomTypePhotoUncheckedCreateInput>
    /**
     * In case the RoomTypePhoto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomTypePhotoUpdateInput, RoomTypePhotoUncheckedUpdateInput>
  }

  /**
   * RoomTypePhoto delete
   */
  export type RoomTypePhotoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypePhoto
     */
    select?: RoomTypePhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypePhotoInclude<ExtArgs> | null
    /**
     * Filter which RoomTypePhoto to delete.
     */
    where: RoomTypePhotoWhereUniqueInput
  }

  /**
   * RoomTypePhoto deleteMany
   */
  export type RoomTypePhotoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomTypePhotos to delete
     */
    where?: RoomTypePhotoWhereInput
  }

  /**
   * RoomTypePhoto without action
   */
  export type RoomTypePhotoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypePhoto
     */
    select?: RoomTypePhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypePhotoInclude<ExtArgs> | null
  }


  /**
   * Model Room
   */

  export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  export type RoomAvgAggregateOutputType = {
    floor: number | null
  }

  export type RoomSumAggregateOutputType = {
    floor: number | null
  }

  export type RoomMinAggregateOutputType = {
    id: string | null
    roomTypeId: string | null
    roomNumber: string | null
    floor: number | null
    status: $Enums.RoomStatus | null
    isActive: boolean | null
  }

  export type RoomMaxAggregateOutputType = {
    id: string | null
    roomTypeId: string | null
    roomNumber: string | null
    floor: number | null
    status: $Enums.RoomStatus | null
    isActive: boolean | null
  }

  export type RoomCountAggregateOutputType = {
    id: number
    roomTypeId: number
    roomNumber: number
    floor: number
    status: number
    isActive: number
    _all: number
  }


  export type RoomAvgAggregateInputType = {
    floor?: true
  }

  export type RoomSumAggregateInputType = {
    floor?: true
  }

  export type RoomMinAggregateInputType = {
    id?: true
    roomTypeId?: true
    roomNumber?: true
    floor?: true
    status?: true
    isActive?: true
  }

  export type RoomMaxAggregateInputType = {
    id?: true
    roomTypeId?: true
    roomNumber?: true
    floor?: true
    status?: true
    isActive?: true
  }

  export type RoomCountAggregateInputType = {
    id?: true
    roomTypeId?: true
    roomNumber?: true
    floor?: true
    status?: true
    isActive?: true
    _all?: true
  }

  export type RoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Room to aggregate.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rooms
    **/
    _count?: true | RoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomMaxAggregateInputType
  }

  export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom[P]>
      : GetScalarType<T[P], AggregateRoom[P]>
  }




  export type RoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithAggregationInput | RoomOrderByWithAggregationInput[]
    by: RoomScalarFieldEnum[] | RoomScalarFieldEnum
    having?: RoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomCountAggregateInputType | true
    _avg?: RoomAvgAggregateInputType
    _sum?: RoomSumAggregateInputType
    _min?: RoomMinAggregateInputType
    _max?: RoomMaxAggregateInputType
  }

  export type RoomGroupByOutputType = {
    id: string
    roomTypeId: string
    roomNumber: string
    floor: number | null
    status: $Enums.RoomStatus
    isActive: boolean
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomGroupByOutputType[P]>
            : GetScalarType<T[P], RoomGroupByOutputType[P]>
        }
      >
    >


  export type RoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomTypeId?: boolean
    roomNumber?: boolean
    floor?: boolean
    status?: boolean
    isActive?: boolean
    roomType?: boolean | RoomTypeDefaultArgs<ExtArgs>
    reservations?: boolean | Room$reservationsArgs<ExtArgs>
    history?: boolean | Room$historyArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomTypeId?: boolean
    roomNumber?: boolean
    floor?: boolean
    status?: boolean
    isActive?: boolean
    roomType?: boolean | RoomTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectScalar = {
    id?: boolean
    roomTypeId?: boolean
    roomNumber?: boolean
    floor?: boolean
    status?: boolean
    isActive?: boolean
  }

  export type RoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomType?: boolean | RoomTypeDefaultArgs<ExtArgs>
    reservations?: boolean | Room$reservationsArgs<ExtArgs>
    history?: boolean | Room$historyArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomType?: boolean | RoomTypeDefaultArgs<ExtArgs>
  }

  export type $RoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Room"
    objects: {
      roomType: Prisma.$RoomTypePayload<ExtArgs>
      reservations: Prisma.$ReservationPayload<ExtArgs>[]
      history: Prisma.$RoomStatusHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomTypeId: string
      roomNumber: string
      floor: number | null
      status: $Enums.RoomStatus
      isActive: boolean
    }, ExtArgs["result"]["room"]>
    composites: {}
  }

  type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = $Result.GetResult<Prisma.$RoomPayload, S>

  type RoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RoomCountAggregateInputType | true
    }

  export interface RoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Room'], meta: { name: 'Room' } }
    /**
     * Find zero or one Room that matches the filter.
     * @param {RoomFindUniqueArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomFindUniqueArgs>(args: SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Room that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RoomFindUniqueOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomFindFirstArgs>(args?: SelectSubset<T, RoomFindFirstArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Room that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.room.findMany()
     * 
     * // Get first 10 Rooms
     * const rooms = await prisma.room.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomWithIdOnly = await prisma.room.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomFindManyArgs>(args?: SelectSubset<T, RoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Room.
     * @param {RoomCreateArgs} args - Arguments to create a Room.
     * @example
     * // Create one Room
     * const Room = await prisma.room.create({
     *   data: {
     *     // ... data to create a Room
     *   }
     * })
     * 
     */
    create<T extends RoomCreateArgs>(args: SelectSubset<T, RoomCreateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Rooms.
     * @param {RoomCreateManyArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomCreateManyArgs>(args?: SelectSubset<T, RoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rooms and returns the data saved in the database.
     * @param {RoomCreateManyAndReturnArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Room.
     * @param {RoomDeleteArgs} args - Arguments to delete one Room.
     * @example
     * // Delete one Room
     * const Room = await prisma.room.delete({
     *   where: {
     *     // ... filter to delete one Room
     *   }
     * })
     * 
     */
    delete<T extends RoomDeleteArgs>(args: SelectSubset<T, RoomDeleteArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Room.
     * @param {RoomUpdateArgs} args - Arguments to update one Room.
     * @example
     * // Update one Room
     * const room = await prisma.room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomUpdateArgs>(args: SelectSubset<T, RoomUpdateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Rooms.
     * @param {RoomDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomDeleteManyArgs>(args?: SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomUpdateManyArgs>(args: SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Room.
     * @param {RoomUpsertArgs} args - Arguments to update or create a Room.
     * @example
     * // Update or create a Room
     * const room = await prisma.room.upsert({
     *   create: {
     *     // ... data to create a Room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room we want to update
     *   }
     * })
     */
    upsert<T extends RoomUpsertArgs>(args: SelectSubset<T, RoomUpsertArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.room.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends RoomCountArgs>(
      args?: Subset<T, RoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomAggregateArgs>(args: Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>

    /**
     * Group by Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomGroupByArgs['orderBy'] }
        : { orderBy?: RoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Room model
   */
  readonly fields: RoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Room.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roomType<T extends RoomTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomTypeDefaultArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    reservations<T extends Room$reservationsArgs<ExtArgs> = {}>(args?: Subset<T, Room$reservationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findMany"> | Null>
    history<T extends Room$historyArgs<ExtArgs> = {}>(args?: Subset<T, Room$historyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStatusHistoryPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Room model
   */ 
  interface RoomFieldRefs {
    readonly id: FieldRef<"Room", 'String'>
    readonly roomTypeId: FieldRef<"Room", 'String'>
    readonly roomNumber: FieldRef<"Room", 'String'>
    readonly floor: FieldRef<"Room", 'Int'>
    readonly status: FieldRef<"Room", 'RoomStatus'>
    readonly isActive: FieldRef<"Room", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Room findUnique
   */
  export type RoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findUniqueOrThrow
   */
  export type RoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findFirst
   */
  export type RoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findFirstOrThrow
   */
  export type RoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findMany
   */
  export type RoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room create
   */
  export type RoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to create a Room.
     */
    data: XOR<RoomCreateInput, RoomUncheckedCreateInput>
  }

  /**
   * Room createMany
   */
  export type RoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room createManyAndReturn
   */
  export type RoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Room update
   */
  export type RoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to update a Room.
     */
    data: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
    /**
     * Choose, which Room to update.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room updateMany
   */
  export type RoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
  }

  /**
   * Room upsert
   */
  export type RoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The filter to search for the Room to update in case it exists.
     */
    where: RoomWhereUniqueInput
    /**
     * In case the Room found by the `where` argument doesn't exist, create a new Room with this data.
     */
    create: XOR<RoomCreateInput, RoomUncheckedCreateInput>
    /**
     * In case the Room was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
  }

  /**
   * Room delete
   */
  export type RoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter which Room to delete.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room deleteMany
   */
  export type RoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rooms to delete
     */
    where?: RoomWhereInput
  }

  /**
   * Room.reservations
   */
  export type Room$reservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    where?: ReservationWhereInput
    orderBy?: ReservationOrderByWithRelationInput | ReservationOrderByWithRelationInput[]
    cursor?: ReservationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * Room.history
   */
  export type Room$historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatusHistory
     */
    select?: RoomStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusHistoryInclude<ExtArgs> | null
    where?: RoomStatusHistoryWhereInput
    orderBy?: RoomStatusHistoryOrderByWithRelationInput | RoomStatusHistoryOrderByWithRelationInput[]
    cursor?: RoomStatusHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomStatusHistoryScalarFieldEnum | RoomStatusHistoryScalarFieldEnum[]
  }

  /**
   * Room without action
   */
  export type RoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
  }


  /**
   * Model Guest
   */

  export type AggregateGuest = {
    _count: GuestCountAggregateOutputType | null
    _min: GuestMinAggregateOutputType | null
    _max: GuestMaxAggregateOutputType | null
  }

  export type GuestMinAggregateOutputType = {
    id: string | null
    userId: string | null
    fullName: string | null
    phone: string | null
    email: string | null
  }

  export type GuestMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    fullName: string | null
    phone: string | null
    email: string | null
  }

  export type GuestCountAggregateOutputType = {
    id: number
    userId: number
    fullName: number
    phone: number
    email: number
    _all: number
  }


  export type GuestMinAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    phone?: true
    email?: true
  }

  export type GuestMaxAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    phone?: true
    email?: true
  }

  export type GuestCountAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    phone?: true
    email?: true
    _all?: true
  }

  export type GuestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Guest to aggregate.
     */
    where?: GuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guests to fetch.
     */
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Guests
    **/
    _count?: true | GuestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuestMaxAggregateInputType
  }

  export type GetGuestAggregateType<T extends GuestAggregateArgs> = {
        [P in keyof T & keyof AggregateGuest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuest[P]>
      : GetScalarType<T[P], AggregateGuest[P]>
  }




  export type GuestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuestWhereInput
    orderBy?: GuestOrderByWithAggregationInput | GuestOrderByWithAggregationInput[]
    by: GuestScalarFieldEnum[] | GuestScalarFieldEnum
    having?: GuestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuestCountAggregateInputType | true
    _min?: GuestMinAggregateInputType
    _max?: GuestMaxAggregateInputType
  }

  export type GuestGroupByOutputType = {
    id: string
    userId: string | null
    fullName: string
    phone: string | null
    email: string | null
    _count: GuestCountAggregateOutputType | null
    _min: GuestMinAggregateOutputType | null
    _max: GuestMaxAggregateOutputType | null
  }

  type GetGuestGroupByPayload<T extends GuestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuestGroupByOutputType[P]>
            : GetScalarType<T[P], GuestGroupByOutputType[P]>
        }
      >
    >


  export type GuestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    phone?: boolean
    email?: boolean
    reservations?: boolean | Guest$reservationsArgs<ExtArgs>
    _count?: boolean | GuestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guest"]>

  export type GuestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    phone?: boolean
    email?: boolean
  }, ExtArgs["result"]["guest"]>

  export type GuestSelectScalar = {
    id?: boolean
    userId?: boolean
    fullName?: boolean
    phone?: boolean
    email?: boolean
  }

  export type GuestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservations?: boolean | Guest$reservationsArgs<ExtArgs>
    _count?: boolean | GuestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GuestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GuestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Guest"
    objects: {
      reservations: Prisma.$ReservationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      fullName: string
      phone: string | null
      email: string | null
    }, ExtArgs["result"]["guest"]>
    composites: {}
  }

  type GuestGetPayload<S extends boolean | null | undefined | GuestDefaultArgs> = $Result.GetResult<Prisma.$GuestPayload, S>

  type GuestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GuestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GuestCountAggregateInputType | true
    }

  export interface GuestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Guest'], meta: { name: 'Guest' } }
    /**
     * Find zero or one Guest that matches the filter.
     * @param {GuestFindUniqueArgs} args - Arguments to find a Guest
     * @example
     * // Get one Guest
     * const guest = await prisma.guest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GuestFindUniqueArgs>(args: SelectSubset<T, GuestFindUniqueArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Guest that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GuestFindUniqueOrThrowArgs} args - Arguments to find a Guest
     * @example
     * // Get one Guest
     * const guest = await prisma.guest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GuestFindUniqueOrThrowArgs>(args: SelectSubset<T, GuestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Guest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestFindFirstArgs} args - Arguments to find a Guest
     * @example
     * // Get one Guest
     * const guest = await prisma.guest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GuestFindFirstArgs>(args?: SelectSubset<T, GuestFindFirstArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Guest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestFindFirstOrThrowArgs} args - Arguments to find a Guest
     * @example
     * // Get one Guest
     * const guest = await prisma.guest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GuestFindFirstOrThrowArgs>(args?: SelectSubset<T, GuestFindFirstOrThrowArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Guests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Guests
     * const guests = await prisma.guest.findMany()
     * 
     * // Get first 10 Guests
     * const guests = await prisma.guest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const guestWithIdOnly = await prisma.guest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GuestFindManyArgs>(args?: SelectSubset<T, GuestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Guest.
     * @param {GuestCreateArgs} args - Arguments to create a Guest.
     * @example
     * // Create one Guest
     * const Guest = await prisma.guest.create({
     *   data: {
     *     // ... data to create a Guest
     *   }
     * })
     * 
     */
    create<T extends GuestCreateArgs>(args: SelectSubset<T, GuestCreateArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Guests.
     * @param {GuestCreateManyArgs} args - Arguments to create many Guests.
     * @example
     * // Create many Guests
     * const guest = await prisma.guest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GuestCreateManyArgs>(args?: SelectSubset<T, GuestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Guests and returns the data saved in the database.
     * @param {GuestCreateManyAndReturnArgs} args - Arguments to create many Guests.
     * @example
     * // Create many Guests
     * const guest = await prisma.guest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Guests and only return the `id`
     * const guestWithIdOnly = await prisma.guest.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GuestCreateManyAndReturnArgs>(args?: SelectSubset<T, GuestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Guest.
     * @param {GuestDeleteArgs} args - Arguments to delete one Guest.
     * @example
     * // Delete one Guest
     * const Guest = await prisma.guest.delete({
     *   where: {
     *     // ... filter to delete one Guest
     *   }
     * })
     * 
     */
    delete<T extends GuestDeleteArgs>(args: SelectSubset<T, GuestDeleteArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Guest.
     * @param {GuestUpdateArgs} args - Arguments to update one Guest.
     * @example
     * // Update one Guest
     * const guest = await prisma.guest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GuestUpdateArgs>(args: SelectSubset<T, GuestUpdateArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Guests.
     * @param {GuestDeleteManyArgs} args - Arguments to filter Guests to delete.
     * @example
     * // Delete a few Guests
     * const { count } = await prisma.guest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GuestDeleteManyArgs>(args?: SelectSubset<T, GuestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Guests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Guests
     * const guest = await prisma.guest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GuestUpdateManyArgs>(args: SelectSubset<T, GuestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Guest.
     * @param {GuestUpsertArgs} args - Arguments to update or create a Guest.
     * @example
     * // Update or create a Guest
     * const guest = await prisma.guest.upsert({
     *   create: {
     *     // ... data to create a Guest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Guest we want to update
     *   }
     * })
     */
    upsert<T extends GuestUpsertArgs>(args: SelectSubset<T, GuestUpsertArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Guests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestCountArgs} args - Arguments to filter Guests to count.
     * @example
     * // Count the number of Guests
     * const count = await prisma.guest.count({
     *   where: {
     *     // ... the filter for the Guests we want to count
     *   }
     * })
    **/
    count<T extends GuestCountArgs>(
      args?: Subset<T, GuestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Guest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GuestAggregateArgs>(args: Subset<T, GuestAggregateArgs>): Prisma.PrismaPromise<GetGuestAggregateType<T>>

    /**
     * Group by Guest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GuestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GuestGroupByArgs['orderBy'] }
        : { orderBy?: GuestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GuestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Guest model
   */
  readonly fields: GuestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Guest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GuestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reservations<T extends Guest$reservationsArgs<ExtArgs> = {}>(args?: Subset<T, Guest$reservationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Guest model
   */ 
  interface GuestFieldRefs {
    readonly id: FieldRef<"Guest", 'String'>
    readonly userId: FieldRef<"Guest", 'String'>
    readonly fullName: FieldRef<"Guest", 'String'>
    readonly phone: FieldRef<"Guest", 'String'>
    readonly email: FieldRef<"Guest", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Guest findUnique
   */
  export type GuestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter, which Guest to fetch.
     */
    where: GuestWhereUniqueInput
  }

  /**
   * Guest findUniqueOrThrow
   */
  export type GuestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter, which Guest to fetch.
     */
    where: GuestWhereUniqueInput
  }

  /**
   * Guest findFirst
   */
  export type GuestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter, which Guest to fetch.
     */
    where?: GuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guests to fetch.
     */
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Guests.
     */
    cursor?: GuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Guests.
     */
    distinct?: GuestScalarFieldEnum | GuestScalarFieldEnum[]
  }

  /**
   * Guest findFirstOrThrow
   */
  export type GuestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter, which Guest to fetch.
     */
    where?: GuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guests to fetch.
     */
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Guests.
     */
    cursor?: GuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Guests.
     */
    distinct?: GuestScalarFieldEnum | GuestScalarFieldEnum[]
  }

  /**
   * Guest findMany
   */
  export type GuestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter, which Guests to fetch.
     */
    where?: GuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guests to fetch.
     */
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Guests.
     */
    cursor?: GuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guests.
     */
    skip?: number
    distinct?: GuestScalarFieldEnum | GuestScalarFieldEnum[]
  }

  /**
   * Guest create
   */
  export type GuestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * The data needed to create a Guest.
     */
    data: XOR<GuestCreateInput, GuestUncheckedCreateInput>
  }

  /**
   * Guest createMany
   */
  export type GuestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Guests.
     */
    data: GuestCreateManyInput | GuestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Guest createManyAndReturn
   */
  export type GuestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Guests.
     */
    data: GuestCreateManyInput | GuestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Guest update
   */
  export type GuestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * The data needed to update a Guest.
     */
    data: XOR<GuestUpdateInput, GuestUncheckedUpdateInput>
    /**
     * Choose, which Guest to update.
     */
    where: GuestWhereUniqueInput
  }

  /**
   * Guest updateMany
   */
  export type GuestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Guests.
     */
    data: XOR<GuestUpdateManyMutationInput, GuestUncheckedUpdateManyInput>
    /**
     * Filter which Guests to update
     */
    where?: GuestWhereInput
  }

  /**
   * Guest upsert
   */
  export type GuestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * The filter to search for the Guest to update in case it exists.
     */
    where: GuestWhereUniqueInput
    /**
     * In case the Guest found by the `where` argument doesn't exist, create a new Guest with this data.
     */
    create: XOR<GuestCreateInput, GuestUncheckedCreateInput>
    /**
     * In case the Guest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GuestUpdateInput, GuestUncheckedUpdateInput>
  }

  /**
   * Guest delete
   */
  export type GuestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter which Guest to delete.
     */
    where: GuestWhereUniqueInput
  }

  /**
   * Guest deleteMany
   */
  export type GuestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Guests to delete
     */
    where?: GuestWhereInput
  }

  /**
   * Guest.reservations
   */
  export type Guest$reservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    where?: ReservationWhereInput
    orderBy?: ReservationOrderByWithRelationInput | ReservationOrderByWithRelationInput[]
    cursor?: ReservationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * Guest without action
   */
  export type GuestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
  }


  /**
   * Model Reservation
   */

  export type AggregateReservation = {
    _count: ReservationCountAggregateOutputType | null
    _avg: ReservationAvgAggregateOutputType | null
    _sum: ReservationSumAggregateOutputType | null
    _min: ReservationMinAggregateOutputType | null
    _max: ReservationMaxAggregateOutputType | null
  }

  export type ReservationAvgAggregateOutputType = {
    guestCount: number | null
    rateSnapshot: number | null
    taxRateBp: number | null
    totalAmount: number | null
  }

  export type ReservationSumAggregateOutputType = {
    guestCount: number | null
    rateSnapshot: number | null
    taxRateBp: number | null
    totalAmount: number | null
  }

  export type ReservationMinAggregateOutputType = {
    id: string | null
    idempotencyKey: string | null
    reference: string | null
    guestId: string | null
    roomTypeId: string | null
    roomId: string | null
    checkIn: Date | null
    checkOut: Date | null
    guestCount: number | null
    specialRequest: string | null
    status: $Enums.ReservationStatus | null
    source: $Enums.ReservationSource | null
    rateSnapshot: number | null
    taxRateBp: number | null
    totalAmount: number | null
    holdExpiresAt: Date | null
    createdBy: string | null
    createdAt: Date | null
  }

  export type ReservationMaxAggregateOutputType = {
    id: string | null
    idempotencyKey: string | null
    reference: string | null
    guestId: string | null
    roomTypeId: string | null
    roomId: string | null
    checkIn: Date | null
    checkOut: Date | null
    guestCount: number | null
    specialRequest: string | null
    status: $Enums.ReservationStatus | null
    source: $Enums.ReservationSource | null
    rateSnapshot: number | null
    taxRateBp: number | null
    totalAmount: number | null
    holdExpiresAt: Date | null
    createdBy: string | null
    createdAt: Date | null
  }

  export type ReservationCountAggregateOutputType = {
    id: number
    idempotencyKey: number
    reference: number
    guestId: number
    roomTypeId: number
    roomId: number
    checkIn: number
    checkOut: number
    guestCount: number
    specialRequest: number
    status: number
    source: number
    rateSnapshot: number
    taxRateBp: number
    totalAmount: number
    holdExpiresAt: number
    createdBy: number
    createdAt: number
    _all: number
  }


  export type ReservationAvgAggregateInputType = {
    guestCount?: true
    rateSnapshot?: true
    taxRateBp?: true
    totalAmount?: true
  }

  export type ReservationSumAggregateInputType = {
    guestCount?: true
    rateSnapshot?: true
    taxRateBp?: true
    totalAmount?: true
  }

  export type ReservationMinAggregateInputType = {
    id?: true
    idempotencyKey?: true
    reference?: true
    guestId?: true
    roomTypeId?: true
    roomId?: true
    checkIn?: true
    checkOut?: true
    guestCount?: true
    specialRequest?: true
    status?: true
    source?: true
    rateSnapshot?: true
    taxRateBp?: true
    totalAmount?: true
    holdExpiresAt?: true
    createdBy?: true
    createdAt?: true
  }

  export type ReservationMaxAggregateInputType = {
    id?: true
    idempotencyKey?: true
    reference?: true
    guestId?: true
    roomTypeId?: true
    roomId?: true
    checkIn?: true
    checkOut?: true
    guestCount?: true
    specialRequest?: true
    status?: true
    source?: true
    rateSnapshot?: true
    taxRateBp?: true
    totalAmount?: true
    holdExpiresAt?: true
    createdBy?: true
    createdAt?: true
  }

  export type ReservationCountAggregateInputType = {
    id?: true
    idempotencyKey?: true
    reference?: true
    guestId?: true
    roomTypeId?: true
    roomId?: true
    checkIn?: true
    checkOut?: true
    guestCount?: true
    specialRequest?: true
    status?: true
    source?: true
    rateSnapshot?: true
    taxRateBp?: true
    totalAmount?: true
    holdExpiresAt?: true
    createdBy?: true
    createdAt?: true
    _all?: true
  }

  export type ReservationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reservation to aggregate.
     */
    where?: ReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reservations to fetch.
     */
    orderBy?: ReservationOrderByWithRelationInput | ReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reservations
    **/
    _count?: true | ReservationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReservationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReservationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReservationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReservationMaxAggregateInputType
  }

  export type GetReservationAggregateType<T extends ReservationAggregateArgs> = {
        [P in keyof T & keyof AggregateReservation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReservation[P]>
      : GetScalarType<T[P], AggregateReservation[P]>
  }




  export type ReservationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReservationWhereInput
    orderBy?: ReservationOrderByWithAggregationInput | ReservationOrderByWithAggregationInput[]
    by: ReservationScalarFieldEnum[] | ReservationScalarFieldEnum
    having?: ReservationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReservationCountAggregateInputType | true
    _avg?: ReservationAvgAggregateInputType
    _sum?: ReservationSumAggregateInputType
    _min?: ReservationMinAggregateInputType
    _max?: ReservationMaxAggregateInputType
  }

  export type ReservationGroupByOutputType = {
    id: string
    idempotencyKey: string
    reference: string
    guestId: string
    roomTypeId: string
    roomId: string | null
    checkIn: Date
    checkOut: Date
    guestCount: number
    specialRequest: string | null
    status: $Enums.ReservationStatus
    source: $Enums.ReservationSource
    rateSnapshot: number
    taxRateBp: number
    totalAmount: number
    holdExpiresAt: Date | null
    createdBy: string
    createdAt: Date
    _count: ReservationCountAggregateOutputType | null
    _avg: ReservationAvgAggregateOutputType | null
    _sum: ReservationSumAggregateOutputType | null
    _min: ReservationMinAggregateOutputType | null
    _max: ReservationMaxAggregateOutputType | null
  }

  type GetReservationGroupByPayload<T extends ReservationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReservationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReservationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReservationGroupByOutputType[P]>
            : GetScalarType<T[P], ReservationGroupByOutputType[P]>
        }
      >
    >


  export type ReservationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idempotencyKey?: boolean
    reference?: boolean
    guestId?: boolean
    roomTypeId?: boolean
    roomId?: boolean
    checkIn?: boolean
    checkOut?: boolean
    guestCount?: boolean
    specialRequest?: boolean
    status?: boolean
    source?: boolean
    rateSnapshot?: boolean
    taxRateBp?: boolean
    totalAmount?: boolean
    holdExpiresAt?: boolean
    createdBy?: boolean
    createdAt?: boolean
    guest?: boolean | GuestDefaultArgs<ExtArgs>
    roomType?: boolean | RoomTypeDefaultArgs<ExtArgs>
    room?: boolean | Reservation$roomArgs<ExtArgs>
    history?: boolean | Reservation$historyArgs<ExtArgs>
    changeLog?: boolean | Reservation$changeLogArgs<ExtArgs>
    _count?: boolean | ReservationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reservation"]>

  export type ReservationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idempotencyKey?: boolean
    reference?: boolean
    guestId?: boolean
    roomTypeId?: boolean
    roomId?: boolean
    checkIn?: boolean
    checkOut?: boolean
    guestCount?: boolean
    specialRequest?: boolean
    status?: boolean
    source?: boolean
    rateSnapshot?: boolean
    taxRateBp?: boolean
    totalAmount?: boolean
    holdExpiresAt?: boolean
    createdBy?: boolean
    createdAt?: boolean
    guest?: boolean | GuestDefaultArgs<ExtArgs>
    roomType?: boolean | RoomTypeDefaultArgs<ExtArgs>
    room?: boolean | Reservation$roomArgs<ExtArgs>
  }, ExtArgs["result"]["reservation"]>

  export type ReservationSelectScalar = {
    id?: boolean
    idempotencyKey?: boolean
    reference?: boolean
    guestId?: boolean
    roomTypeId?: boolean
    roomId?: boolean
    checkIn?: boolean
    checkOut?: boolean
    guestCount?: boolean
    specialRequest?: boolean
    status?: boolean
    source?: boolean
    rateSnapshot?: boolean
    taxRateBp?: boolean
    totalAmount?: boolean
    holdExpiresAt?: boolean
    createdBy?: boolean
    createdAt?: boolean
  }

  export type ReservationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    guest?: boolean | GuestDefaultArgs<ExtArgs>
    roomType?: boolean | RoomTypeDefaultArgs<ExtArgs>
    room?: boolean | Reservation$roomArgs<ExtArgs>
    history?: boolean | Reservation$historyArgs<ExtArgs>
    changeLog?: boolean | Reservation$changeLogArgs<ExtArgs>
    _count?: boolean | ReservationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReservationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    guest?: boolean | GuestDefaultArgs<ExtArgs>
    roomType?: boolean | RoomTypeDefaultArgs<ExtArgs>
    room?: boolean | Reservation$roomArgs<ExtArgs>
  }

  export type $ReservationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Reservation"
    objects: {
      guest: Prisma.$GuestPayload<ExtArgs>
      roomType: Prisma.$RoomTypePayload<ExtArgs>
      room: Prisma.$RoomPayload<ExtArgs> | null
      history: Prisma.$ReservationStatusHistoryPayload<ExtArgs>[]
      changeLog: Prisma.$ReservationChangeLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      idempotencyKey: string
      reference: string
      guestId: string
      roomTypeId: string
      roomId: string | null
      checkIn: Date
      checkOut: Date
      guestCount: number
      specialRequest: string | null
      status: $Enums.ReservationStatus
      source: $Enums.ReservationSource
      rateSnapshot: number
      taxRateBp: number
      totalAmount: number
      holdExpiresAt: Date | null
      createdBy: string
      createdAt: Date
    }, ExtArgs["result"]["reservation"]>
    composites: {}
  }

  type ReservationGetPayload<S extends boolean | null | undefined | ReservationDefaultArgs> = $Result.GetResult<Prisma.$ReservationPayload, S>

  type ReservationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReservationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReservationCountAggregateInputType | true
    }

  export interface ReservationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Reservation'], meta: { name: 'Reservation' } }
    /**
     * Find zero or one Reservation that matches the filter.
     * @param {ReservationFindUniqueArgs} args - Arguments to find a Reservation
     * @example
     * // Get one Reservation
     * const reservation = await prisma.reservation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReservationFindUniqueArgs>(args: SelectSubset<T, ReservationFindUniqueArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Reservation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReservationFindUniqueOrThrowArgs} args - Arguments to find a Reservation
     * @example
     * // Get one Reservation
     * const reservation = await prisma.reservation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReservationFindUniqueOrThrowArgs>(args: SelectSubset<T, ReservationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Reservation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationFindFirstArgs} args - Arguments to find a Reservation
     * @example
     * // Get one Reservation
     * const reservation = await prisma.reservation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReservationFindFirstArgs>(args?: SelectSubset<T, ReservationFindFirstArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Reservation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationFindFirstOrThrowArgs} args - Arguments to find a Reservation
     * @example
     * // Get one Reservation
     * const reservation = await prisma.reservation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReservationFindFirstOrThrowArgs>(args?: SelectSubset<T, ReservationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Reservations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reservations
     * const reservations = await prisma.reservation.findMany()
     * 
     * // Get first 10 Reservations
     * const reservations = await prisma.reservation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reservationWithIdOnly = await prisma.reservation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReservationFindManyArgs>(args?: SelectSubset<T, ReservationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Reservation.
     * @param {ReservationCreateArgs} args - Arguments to create a Reservation.
     * @example
     * // Create one Reservation
     * const Reservation = await prisma.reservation.create({
     *   data: {
     *     // ... data to create a Reservation
     *   }
     * })
     * 
     */
    create<T extends ReservationCreateArgs>(args: SelectSubset<T, ReservationCreateArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Reservations.
     * @param {ReservationCreateManyArgs} args - Arguments to create many Reservations.
     * @example
     * // Create many Reservations
     * const reservation = await prisma.reservation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReservationCreateManyArgs>(args?: SelectSubset<T, ReservationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reservations and returns the data saved in the database.
     * @param {ReservationCreateManyAndReturnArgs} args - Arguments to create many Reservations.
     * @example
     * // Create many Reservations
     * const reservation = await prisma.reservation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reservations and only return the `id`
     * const reservationWithIdOnly = await prisma.reservation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReservationCreateManyAndReturnArgs>(args?: SelectSubset<T, ReservationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Reservation.
     * @param {ReservationDeleteArgs} args - Arguments to delete one Reservation.
     * @example
     * // Delete one Reservation
     * const Reservation = await prisma.reservation.delete({
     *   where: {
     *     // ... filter to delete one Reservation
     *   }
     * })
     * 
     */
    delete<T extends ReservationDeleteArgs>(args: SelectSubset<T, ReservationDeleteArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Reservation.
     * @param {ReservationUpdateArgs} args - Arguments to update one Reservation.
     * @example
     * // Update one Reservation
     * const reservation = await prisma.reservation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReservationUpdateArgs>(args: SelectSubset<T, ReservationUpdateArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Reservations.
     * @param {ReservationDeleteManyArgs} args - Arguments to filter Reservations to delete.
     * @example
     * // Delete a few Reservations
     * const { count } = await prisma.reservation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReservationDeleteManyArgs>(args?: SelectSubset<T, ReservationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reservations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reservations
     * const reservation = await prisma.reservation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReservationUpdateManyArgs>(args: SelectSubset<T, ReservationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Reservation.
     * @param {ReservationUpsertArgs} args - Arguments to update or create a Reservation.
     * @example
     * // Update or create a Reservation
     * const reservation = await prisma.reservation.upsert({
     *   create: {
     *     // ... data to create a Reservation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reservation we want to update
     *   }
     * })
     */
    upsert<T extends ReservationUpsertArgs>(args: SelectSubset<T, ReservationUpsertArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Reservations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationCountArgs} args - Arguments to filter Reservations to count.
     * @example
     * // Count the number of Reservations
     * const count = await prisma.reservation.count({
     *   where: {
     *     // ... the filter for the Reservations we want to count
     *   }
     * })
    **/
    count<T extends ReservationCountArgs>(
      args?: Subset<T, ReservationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReservationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reservation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReservationAggregateArgs>(args: Subset<T, ReservationAggregateArgs>): Prisma.PrismaPromise<GetReservationAggregateType<T>>

    /**
     * Group by Reservation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReservationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReservationGroupByArgs['orderBy'] }
        : { orderBy?: ReservationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReservationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReservationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Reservation model
   */
  readonly fields: ReservationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Reservation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReservationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    guest<T extends GuestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GuestDefaultArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    roomType<T extends RoomTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomTypeDefaultArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    room<T extends Reservation$roomArgs<ExtArgs> = {}>(args?: Subset<T, Reservation$roomArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    history<T extends Reservation$historyArgs<ExtArgs> = {}>(args?: Subset<T, Reservation$historyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationStatusHistoryPayload<ExtArgs>, T, "findMany"> | Null>
    changeLog<T extends Reservation$changeLogArgs<ExtArgs> = {}>(args?: Subset<T, Reservation$changeLogArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationChangeLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Reservation model
   */ 
  interface ReservationFieldRefs {
    readonly id: FieldRef<"Reservation", 'String'>
    readonly idempotencyKey: FieldRef<"Reservation", 'String'>
    readonly reference: FieldRef<"Reservation", 'String'>
    readonly guestId: FieldRef<"Reservation", 'String'>
    readonly roomTypeId: FieldRef<"Reservation", 'String'>
    readonly roomId: FieldRef<"Reservation", 'String'>
    readonly checkIn: FieldRef<"Reservation", 'DateTime'>
    readonly checkOut: FieldRef<"Reservation", 'DateTime'>
    readonly guestCount: FieldRef<"Reservation", 'Int'>
    readonly specialRequest: FieldRef<"Reservation", 'String'>
    readonly status: FieldRef<"Reservation", 'ReservationStatus'>
    readonly source: FieldRef<"Reservation", 'ReservationSource'>
    readonly rateSnapshot: FieldRef<"Reservation", 'Int'>
    readonly taxRateBp: FieldRef<"Reservation", 'Int'>
    readonly totalAmount: FieldRef<"Reservation", 'Int'>
    readonly holdExpiresAt: FieldRef<"Reservation", 'DateTime'>
    readonly createdBy: FieldRef<"Reservation", 'String'>
    readonly createdAt: FieldRef<"Reservation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Reservation findUnique
   */
  export type ReservationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * Filter, which Reservation to fetch.
     */
    where: ReservationWhereUniqueInput
  }

  /**
   * Reservation findUniqueOrThrow
   */
  export type ReservationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * Filter, which Reservation to fetch.
     */
    where: ReservationWhereUniqueInput
  }

  /**
   * Reservation findFirst
   */
  export type ReservationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * Filter, which Reservation to fetch.
     */
    where?: ReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reservations to fetch.
     */
    orderBy?: ReservationOrderByWithRelationInput | ReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reservations.
     */
    cursor?: ReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reservations.
     */
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * Reservation findFirstOrThrow
   */
  export type ReservationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * Filter, which Reservation to fetch.
     */
    where?: ReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reservations to fetch.
     */
    orderBy?: ReservationOrderByWithRelationInput | ReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reservations.
     */
    cursor?: ReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reservations.
     */
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * Reservation findMany
   */
  export type ReservationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * Filter, which Reservations to fetch.
     */
    where?: ReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reservations to fetch.
     */
    orderBy?: ReservationOrderByWithRelationInput | ReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reservations.
     */
    cursor?: ReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reservations.
     */
    skip?: number
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * Reservation create
   */
  export type ReservationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * The data needed to create a Reservation.
     */
    data: XOR<ReservationCreateInput, ReservationUncheckedCreateInput>
  }

  /**
   * Reservation createMany
   */
  export type ReservationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reservations.
     */
    data: ReservationCreateManyInput | ReservationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Reservation createManyAndReturn
   */
  export type ReservationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Reservations.
     */
    data: ReservationCreateManyInput | ReservationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reservation update
   */
  export type ReservationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * The data needed to update a Reservation.
     */
    data: XOR<ReservationUpdateInput, ReservationUncheckedUpdateInput>
    /**
     * Choose, which Reservation to update.
     */
    where: ReservationWhereUniqueInput
  }

  /**
   * Reservation updateMany
   */
  export type ReservationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reservations.
     */
    data: XOR<ReservationUpdateManyMutationInput, ReservationUncheckedUpdateManyInput>
    /**
     * Filter which Reservations to update
     */
    where?: ReservationWhereInput
  }

  /**
   * Reservation upsert
   */
  export type ReservationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * The filter to search for the Reservation to update in case it exists.
     */
    where: ReservationWhereUniqueInput
    /**
     * In case the Reservation found by the `where` argument doesn't exist, create a new Reservation with this data.
     */
    create: XOR<ReservationCreateInput, ReservationUncheckedCreateInput>
    /**
     * In case the Reservation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReservationUpdateInput, ReservationUncheckedUpdateInput>
  }

  /**
   * Reservation delete
   */
  export type ReservationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * Filter which Reservation to delete.
     */
    where: ReservationWhereUniqueInput
  }

  /**
   * Reservation deleteMany
   */
  export type ReservationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reservations to delete
     */
    where?: ReservationWhereInput
  }

  /**
   * Reservation.room
   */
  export type Reservation$roomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    where?: RoomWhereInput
  }

  /**
   * Reservation.history
   */
  export type Reservation$historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationStatusHistory
     */
    select?: ReservationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationStatusHistoryInclude<ExtArgs> | null
    where?: ReservationStatusHistoryWhereInput
    orderBy?: ReservationStatusHistoryOrderByWithRelationInput | ReservationStatusHistoryOrderByWithRelationInput[]
    cursor?: ReservationStatusHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReservationStatusHistoryScalarFieldEnum | ReservationStatusHistoryScalarFieldEnum[]
  }

  /**
   * Reservation.changeLog
   */
  export type Reservation$changeLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationChangeLog
     */
    select?: ReservationChangeLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationChangeLogInclude<ExtArgs> | null
    where?: ReservationChangeLogWhereInput
    orderBy?: ReservationChangeLogOrderByWithRelationInput | ReservationChangeLogOrderByWithRelationInput[]
    cursor?: ReservationChangeLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReservationChangeLogScalarFieldEnum | ReservationChangeLogScalarFieldEnum[]
  }

  /**
   * Reservation without action
   */
  export type ReservationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
  }


  /**
   * Model ReservationStatusHistory
   */

  export type AggregateReservationStatusHistory = {
    _count: ReservationStatusHistoryCountAggregateOutputType | null
    _min: ReservationStatusHistoryMinAggregateOutputType | null
    _max: ReservationStatusHistoryMaxAggregateOutputType | null
  }

  export type ReservationStatusHistoryMinAggregateOutputType = {
    id: string | null
    reservationId: string | null
    fromStatus: string | null
    toStatus: string | null
    changedBy: string | null
    reason: string | null
    changedAt: Date | null
  }

  export type ReservationStatusHistoryMaxAggregateOutputType = {
    id: string | null
    reservationId: string | null
    fromStatus: string | null
    toStatus: string | null
    changedBy: string | null
    reason: string | null
    changedAt: Date | null
  }

  export type ReservationStatusHistoryCountAggregateOutputType = {
    id: number
    reservationId: number
    fromStatus: number
    toStatus: number
    changedBy: number
    reason: number
    changedAt: number
    _all: number
  }


  export type ReservationStatusHistoryMinAggregateInputType = {
    id?: true
    reservationId?: true
    fromStatus?: true
    toStatus?: true
    changedBy?: true
    reason?: true
    changedAt?: true
  }

  export type ReservationStatusHistoryMaxAggregateInputType = {
    id?: true
    reservationId?: true
    fromStatus?: true
    toStatus?: true
    changedBy?: true
    reason?: true
    changedAt?: true
  }

  export type ReservationStatusHistoryCountAggregateInputType = {
    id?: true
    reservationId?: true
    fromStatus?: true
    toStatus?: true
    changedBy?: true
    reason?: true
    changedAt?: true
    _all?: true
  }

  export type ReservationStatusHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReservationStatusHistory to aggregate.
     */
    where?: ReservationStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReservationStatusHistories to fetch.
     */
    orderBy?: ReservationStatusHistoryOrderByWithRelationInput | ReservationStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReservationStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReservationStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReservationStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReservationStatusHistories
    **/
    _count?: true | ReservationStatusHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReservationStatusHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReservationStatusHistoryMaxAggregateInputType
  }

  export type GetReservationStatusHistoryAggregateType<T extends ReservationStatusHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateReservationStatusHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReservationStatusHistory[P]>
      : GetScalarType<T[P], AggregateReservationStatusHistory[P]>
  }




  export type ReservationStatusHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReservationStatusHistoryWhereInput
    orderBy?: ReservationStatusHistoryOrderByWithAggregationInput | ReservationStatusHistoryOrderByWithAggregationInput[]
    by: ReservationStatusHistoryScalarFieldEnum[] | ReservationStatusHistoryScalarFieldEnum
    having?: ReservationStatusHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReservationStatusHistoryCountAggregateInputType | true
    _min?: ReservationStatusHistoryMinAggregateInputType
    _max?: ReservationStatusHistoryMaxAggregateInputType
  }

  export type ReservationStatusHistoryGroupByOutputType = {
    id: string
    reservationId: string
    fromStatus: string | null
    toStatus: string
    changedBy: string
    reason: string | null
    changedAt: Date
    _count: ReservationStatusHistoryCountAggregateOutputType | null
    _min: ReservationStatusHistoryMinAggregateOutputType | null
    _max: ReservationStatusHistoryMaxAggregateOutputType | null
  }

  type GetReservationStatusHistoryGroupByPayload<T extends ReservationStatusHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReservationStatusHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReservationStatusHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReservationStatusHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], ReservationStatusHistoryGroupByOutputType[P]>
        }
      >
    >


  export type ReservationStatusHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reservationId?: boolean
    fromStatus?: boolean
    toStatus?: boolean
    changedBy?: boolean
    reason?: boolean
    changedAt?: boolean
    reservation?: boolean | ReservationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reservationStatusHistory"]>

  export type ReservationStatusHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reservationId?: boolean
    fromStatus?: boolean
    toStatus?: boolean
    changedBy?: boolean
    reason?: boolean
    changedAt?: boolean
    reservation?: boolean | ReservationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reservationStatusHistory"]>

  export type ReservationStatusHistorySelectScalar = {
    id?: boolean
    reservationId?: boolean
    fromStatus?: boolean
    toStatus?: boolean
    changedBy?: boolean
    reason?: boolean
    changedAt?: boolean
  }

  export type ReservationStatusHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservation?: boolean | ReservationDefaultArgs<ExtArgs>
  }
  export type ReservationStatusHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservation?: boolean | ReservationDefaultArgs<ExtArgs>
  }

  export type $ReservationStatusHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReservationStatusHistory"
    objects: {
      reservation: Prisma.$ReservationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reservationId: string
      fromStatus: string | null
      toStatus: string
      changedBy: string
      reason: string | null
      changedAt: Date
    }, ExtArgs["result"]["reservationStatusHistory"]>
    composites: {}
  }

  type ReservationStatusHistoryGetPayload<S extends boolean | null | undefined | ReservationStatusHistoryDefaultArgs> = $Result.GetResult<Prisma.$ReservationStatusHistoryPayload, S>

  type ReservationStatusHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReservationStatusHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReservationStatusHistoryCountAggregateInputType | true
    }

  export interface ReservationStatusHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReservationStatusHistory'], meta: { name: 'ReservationStatusHistory' } }
    /**
     * Find zero or one ReservationStatusHistory that matches the filter.
     * @param {ReservationStatusHistoryFindUniqueArgs} args - Arguments to find a ReservationStatusHistory
     * @example
     * // Get one ReservationStatusHistory
     * const reservationStatusHistory = await prisma.reservationStatusHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReservationStatusHistoryFindUniqueArgs>(args: SelectSubset<T, ReservationStatusHistoryFindUniqueArgs<ExtArgs>>): Prisma__ReservationStatusHistoryClient<$Result.GetResult<Prisma.$ReservationStatusHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ReservationStatusHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReservationStatusHistoryFindUniqueOrThrowArgs} args - Arguments to find a ReservationStatusHistory
     * @example
     * // Get one ReservationStatusHistory
     * const reservationStatusHistory = await prisma.reservationStatusHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReservationStatusHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ReservationStatusHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReservationStatusHistoryClient<$Result.GetResult<Prisma.$ReservationStatusHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ReservationStatusHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationStatusHistoryFindFirstArgs} args - Arguments to find a ReservationStatusHistory
     * @example
     * // Get one ReservationStatusHistory
     * const reservationStatusHistory = await prisma.reservationStatusHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReservationStatusHistoryFindFirstArgs>(args?: SelectSubset<T, ReservationStatusHistoryFindFirstArgs<ExtArgs>>): Prisma__ReservationStatusHistoryClient<$Result.GetResult<Prisma.$ReservationStatusHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ReservationStatusHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationStatusHistoryFindFirstOrThrowArgs} args - Arguments to find a ReservationStatusHistory
     * @example
     * // Get one ReservationStatusHistory
     * const reservationStatusHistory = await prisma.reservationStatusHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReservationStatusHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ReservationStatusHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReservationStatusHistoryClient<$Result.GetResult<Prisma.$ReservationStatusHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ReservationStatusHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationStatusHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReservationStatusHistories
     * const reservationStatusHistories = await prisma.reservationStatusHistory.findMany()
     * 
     * // Get first 10 ReservationStatusHistories
     * const reservationStatusHistories = await prisma.reservationStatusHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reservationStatusHistoryWithIdOnly = await prisma.reservationStatusHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReservationStatusHistoryFindManyArgs>(args?: SelectSubset<T, ReservationStatusHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationStatusHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ReservationStatusHistory.
     * @param {ReservationStatusHistoryCreateArgs} args - Arguments to create a ReservationStatusHistory.
     * @example
     * // Create one ReservationStatusHistory
     * const ReservationStatusHistory = await prisma.reservationStatusHistory.create({
     *   data: {
     *     // ... data to create a ReservationStatusHistory
     *   }
     * })
     * 
     */
    create<T extends ReservationStatusHistoryCreateArgs>(args: SelectSubset<T, ReservationStatusHistoryCreateArgs<ExtArgs>>): Prisma__ReservationStatusHistoryClient<$Result.GetResult<Prisma.$ReservationStatusHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ReservationStatusHistories.
     * @param {ReservationStatusHistoryCreateManyArgs} args - Arguments to create many ReservationStatusHistories.
     * @example
     * // Create many ReservationStatusHistories
     * const reservationStatusHistory = await prisma.reservationStatusHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReservationStatusHistoryCreateManyArgs>(args?: SelectSubset<T, ReservationStatusHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReservationStatusHistories and returns the data saved in the database.
     * @param {ReservationStatusHistoryCreateManyAndReturnArgs} args - Arguments to create many ReservationStatusHistories.
     * @example
     * // Create many ReservationStatusHistories
     * const reservationStatusHistory = await prisma.reservationStatusHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReservationStatusHistories and only return the `id`
     * const reservationStatusHistoryWithIdOnly = await prisma.reservationStatusHistory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReservationStatusHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, ReservationStatusHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationStatusHistoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ReservationStatusHistory.
     * @param {ReservationStatusHistoryDeleteArgs} args - Arguments to delete one ReservationStatusHistory.
     * @example
     * // Delete one ReservationStatusHistory
     * const ReservationStatusHistory = await prisma.reservationStatusHistory.delete({
     *   where: {
     *     // ... filter to delete one ReservationStatusHistory
     *   }
     * })
     * 
     */
    delete<T extends ReservationStatusHistoryDeleteArgs>(args: SelectSubset<T, ReservationStatusHistoryDeleteArgs<ExtArgs>>): Prisma__ReservationStatusHistoryClient<$Result.GetResult<Prisma.$ReservationStatusHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ReservationStatusHistory.
     * @param {ReservationStatusHistoryUpdateArgs} args - Arguments to update one ReservationStatusHistory.
     * @example
     * // Update one ReservationStatusHistory
     * const reservationStatusHistory = await prisma.reservationStatusHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReservationStatusHistoryUpdateArgs>(args: SelectSubset<T, ReservationStatusHistoryUpdateArgs<ExtArgs>>): Prisma__ReservationStatusHistoryClient<$Result.GetResult<Prisma.$ReservationStatusHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ReservationStatusHistories.
     * @param {ReservationStatusHistoryDeleteManyArgs} args - Arguments to filter ReservationStatusHistories to delete.
     * @example
     * // Delete a few ReservationStatusHistories
     * const { count } = await prisma.reservationStatusHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReservationStatusHistoryDeleteManyArgs>(args?: SelectSubset<T, ReservationStatusHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReservationStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationStatusHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReservationStatusHistories
     * const reservationStatusHistory = await prisma.reservationStatusHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReservationStatusHistoryUpdateManyArgs>(args: SelectSubset<T, ReservationStatusHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ReservationStatusHistory.
     * @param {ReservationStatusHistoryUpsertArgs} args - Arguments to update or create a ReservationStatusHistory.
     * @example
     * // Update or create a ReservationStatusHistory
     * const reservationStatusHistory = await prisma.reservationStatusHistory.upsert({
     *   create: {
     *     // ... data to create a ReservationStatusHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReservationStatusHistory we want to update
     *   }
     * })
     */
    upsert<T extends ReservationStatusHistoryUpsertArgs>(args: SelectSubset<T, ReservationStatusHistoryUpsertArgs<ExtArgs>>): Prisma__ReservationStatusHistoryClient<$Result.GetResult<Prisma.$ReservationStatusHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ReservationStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationStatusHistoryCountArgs} args - Arguments to filter ReservationStatusHistories to count.
     * @example
     * // Count the number of ReservationStatusHistories
     * const count = await prisma.reservationStatusHistory.count({
     *   where: {
     *     // ... the filter for the ReservationStatusHistories we want to count
     *   }
     * })
    **/
    count<T extends ReservationStatusHistoryCountArgs>(
      args?: Subset<T, ReservationStatusHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReservationStatusHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReservationStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationStatusHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReservationStatusHistoryAggregateArgs>(args: Subset<T, ReservationStatusHistoryAggregateArgs>): Prisma.PrismaPromise<GetReservationStatusHistoryAggregateType<T>>

    /**
     * Group by ReservationStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationStatusHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReservationStatusHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReservationStatusHistoryGroupByArgs['orderBy'] }
        : { orderBy?: ReservationStatusHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReservationStatusHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReservationStatusHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReservationStatusHistory model
   */
  readonly fields: ReservationStatusHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReservationStatusHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReservationStatusHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reservation<T extends ReservationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReservationDefaultArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReservationStatusHistory model
   */ 
  interface ReservationStatusHistoryFieldRefs {
    readonly id: FieldRef<"ReservationStatusHistory", 'String'>
    readonly reservationId: FieldRef<"ReservationStatusHistory", 'String'>
    readonly fromStatus: FieldRef<"ReservationStatusHistory", 'String'>
    readonly toStatus: FieldRef<"ReservationStatusHistory", 'String'>
    readonly changedBy: FieldRef<"ReservationStatusHistory", 'String'>
    readonly reason: FieldRef<"ReservationStatusHistory", 'String'>
    readonly changedAt: FieldRef<"ReservationStatusHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReservationStatusHistory findUnique
   */
  export type ReservationStatusHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationStatusHistory
     */
    select?: ReservationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ReservationStatusHistory to fetch.
     */
    where: ReservationStatusHistoryWhereUniqueInput
  }

  /**
   * ReservationStatusHistory findUniqueOrThrow
   */
  export type ReservationStatusHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationStatusHistory
     */
    select?: ReservationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ReservationStatusHistory to fetch.
     */
    where: ReservationStatusHistoryWhereUniqueInput
  }

  /**
   * ReservationStatusHistory findFirst
   */
  export type ReservationStatusHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationStatusHistory
     */
    select?: ReservationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ReservationStatusHistory to fetch.
     */
    where?: ReservationStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReservationStatusHistories to fetch.
     */
    orderBy?: ReservationStatusHistoryOrderByWithRelationInput | ReservationStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReservationStatusHistories.
     */
    cursor?: ReservationStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReservationStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReservationStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReservationStatusHistories.
     */
    distinct?: ReservationStatusHistoryScalarFieldEnum | ReservationStatusHistoryScalarFieldEnum[]
  }

  /**
   * ReservationStatusHistory findFirstOrThrow
   */
  export type ReservationStatusHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationStatusHistory
     */
    select?: ReservationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ReservationStatusHistory to fetch.
     */
    where?: ReservationStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReservationStatusHistories to fetch.
     */
    orderBy?: ReservationStatusHistoryOrderByWithRelationInput | ReservationStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReservationStatusHistories.
     */
    cursor?: ReservationStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReservationStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReservationStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReservationStatusHistories.
     */
    distinct?: ReservationStatusHistoryScalarFieldEnum | ReservationStatusHistoryScalarFieldEnum[]
  }

  /**
   * ReservationStatusHistory findMany
   */
  export type ReservationStatusHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationStatusHistory
     */
    select?: ReservationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ReservationStatusHistories to fetch.
     */
    where?: ReservationStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReservationStatusHistories to fetch.
     */
    orderBy?: ReservationStatusHistoryOrderByWithRelationInput | ReservationStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReservationStatusHistories.
     */
    cursor?: ReservationStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReservationStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReservationStatusHistories.
     */
    skip?: number
    distinct?: ReservationStatusHistoryScalarFieldEnum | ReservationStatusHistoryScalarFieldEnum[]
  }

  /**
   * ReservationStatusHistory create
   */
  export type ReservationStatusHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationStatusHistory
     */
    select?: ReservationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ReservationStatusHistory.
     */
    data: XOR<ReservationStatusHistoryCreateInput, ReservationStatusHistoryUncheckedCreateInput>
  }

  /**
   * ReservationStatusHistory createMany
   */
  export type ReservationStatusHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReservationStatusHistories.
     */
    data: ReservationStatusHistoryCreateManyInput | ReservationStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReservationStatusHistory createManyAndReturn
   */
  export type ReservationStatusHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationStatusHistory
     */
    select?: ReservationStatusHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ReservationStatusHistories.
     */
    data: ReservationStatusHistoryCreateManyInput | ReservationStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationStatusHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReservationStatusHistory update
   */
  export type ReservationStatusHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationStatusHistory
     */
    select?: ReservationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ReservationStatusHistory.
     */
    data: XOR<ReservationStatusHistoryUpdateInput, ReservationStatusHistoryUncheckedUpdateInput>
    /**
     * Choose, which ReservationStatusHistory to update.
     */
    where: ReservationStatusHistoryWhereUniqueInput
  }

  /**
   * ReservationStatusHistory updateMany
   */
  export type ReservationStatusHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReservationStatusHistories.
     */
    data: XOR<ReservationStatusHistoryUpdateManyMutationInput, ReservationStatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which ReservationStatusHistories to update
     */
    where?: ReservationStatusHistoryWhereInput
  }

  /**
   * ReservationStatusHistory upsert
   */
  export type ReservationStatusHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationStatusHistory
     */
    select?: ReservationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationStatusHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ReservationStatusHistory to update in case it exists.
     */
    where: ReservationStatusHistoryWhereUniqueInput
    /**
     * In case the ReservationStatusHistory found by the `where` argument doesn't exist, create a new ReservationStatusHistory with this data.
     */
    create: XOR<ReservationStatusHistoryCreateInput, ReservationStatusHistoryUncheckedCreateInput>
    /**
     * In case the ReservationStatusHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReservationStatusHistoryUpdateInput, ReservationStatusHistoryUncheckedUpdateInput>
  }

  /**
   * ReservationStatusHistory delete
   */
  export type ReservationStatusHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationStatusHistory
     */
    select?: ReservationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter which ReservationStatusHistory to delete.
     */
    where: ReservationStatusHistoryWhereUniqueInput
  }

  /**
   * ReservationStatusHistory deleteMany
   */
  export type ReservationStatusHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReservationStatusHistories to delete
     */
    where?: ReservationStatusHistoryWhereInput
  }

  /**
   * ReservationStatusHistory without action
   */
  export type ReservationStatusHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationStatusHistory
     */
    select?: ReservationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationStatusHistoryInclude<ExtArgs> | null
  }


  /**
   * Model ReservationChangeLog
   */

  export type AggregateReservationChangeLog = {
    _count: ReservationChangeLogCountAggregateOutputType | null
    _min: ReservationChangeLogMinAggregateOutputType | null
    _max: ReservationChangeLogMaxAggregateOutputType | null
  }

  export type ReservationChangeLogMinAggregateOutputType = {
    id: string | null
    reservationId: string | null
    field: string | null
    oldValue: string | null
    newValue: string | null
    changedBy: string | null
    changedAt: Date | null
  }

  export type ReservationChangeLogMaxAggregateOutputType = {
    id: string | null
    reservationId: string | null
    field: string | null
    oldValue: string | null
    newValue: string | null
    changedBy: string | null
    changedAt: Date | null
  }

  export type ReservationChangeLogCountAggregateOutputType = {
    id: number
    reservationId: number
    field: number
    oldValue: number
    newValue: number
    changedBy: number
    changedAt: number
    _all: number
  }


  export type ReservationChangeLogMinAggregateInputType = {
    id?: true
    reservationId?: true
    field?: true
    oldValue?: true
    newValue?: true
    changedBy?: true
    changedAt?: true
  }

  export type ReservationChangeLogMaxAggregateInputType = {
    id?: true
    reservationId?: true
    field?: true
    oldValue?: true
    newValue?: true
    changedBy?: true
    changedAt?: true
  }

  export type ReservationChangeLogCountAggregateInputType = {
    id?: true
    reservationId?: true
    field?: true
    oldValue?: true
    newValue?: true
    changedBy?: true
    changedAt?: true
    _all?: true
  }

  export type ReservationChangeLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReservationChangeLog to aggregate.
     */
    where?: ReservationChangeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReservationChangeLogs to fetch.
     */
    orderBy?: ReservationChangeLogOrderByWithRelationInput | ReservationChangeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReservationChangeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReservationChangeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReservationChangeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReservationChangeLogs
    **/
    _count?: true | ReservationChangeLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReservationChangeLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReservationChangeLogMaxAggregateInputType
  }

  export type GetReservationChangeLogAggregateType<T extends ReservationChangeLogAggregateArgs> = {
        [P in keyof T & keyof AggregateReservationChangeLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReservationChangeLog[P]>
      : GetScalarType<T[P], AggregateReservationChangeLog[P]>
  }




  export type ReservationChangeLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReservationChangeLogWhereInput
    orderBy?: ReservationChangeLogOrderByWithAggregationInput | ReservationChangeLogOrderByWithAggregationInput[]
    by: ReservationChangeLogScalarFieldEnum[] | ReservationChangeLogScalarFieldEnum
    having?: ReservationChangeLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReservationChangeLogCountAggregateInputType | true
    _min?: ReservationChangeLogMinAggregateInputType
    _max?: ReservationChangeLogMaxAggregateInputType
  }

  export type ReservationChangeLogGroupByOutputType = {
    id: string
    reservationId: string
    field: string
    oldValue: string | null
    newValue: string | null
    changedBy: string
    changedAt: Date
    _count: ReservationChangeLogCountAggregateOutputType | null
    _min: ReservationChangeLogMinAggregateOutputType | null
    _max: ReservationChangeLogMaxAggregateOutputType | null
  }

  type GetReservationChangeLogGroupByPayload<T extends ReservationChangeLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReservationChangeLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReservationChangeLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReservationChangeLogGroupByOutputType[P]>
            : GetScalarType<T[P], ReservationChangeLogGroupByOutputType[P]>
        }
      >
    >


  export type ReservationChangeLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reservationId?: boolean
    field?: boolean
    oldValue?: boolean
    newValue?: boolean
    changedBy?: boolean
    changedAt?: boolean
    reservation?: boolean | ReservationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reservationChangeLog"]>

  export type ReservationChangeLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reservationId?: boolean
    field?: boolean
    oldValue?: boolean
    newValue?: boolean
    changedBy?: boolean
    changedAt?: boolean
    reservation?: boolean | ReservationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reservationChangeLog"]>

  export type ReservationChangeLogSelectScalar = {
    id?: boolean
    reservationId?: boolean
    field?: boolean
    oldValue?: boolean
    newValue?: boolean
    changedBy?: boolean
    changedAt?: boolean
  }

  export type ReservationChangeLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservation?: boolean | ReservationDefaultArgs<ExtArgs>
  }
  export type ReservationChangeLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservation?: boolean | ReservationDefaultArgs<ExtArgs>
  }

  export type $ReservationChangeLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReservationChangeLog"
    objects: {
      reservation: Prisma.$ReservationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reservationId: string
      field: string
      oldValue: string | null
      newValue: string | null
      changedBy: string
      changedAt: Date
    }, ExtArgs["result"]["reservationChangeLog"]>
    composites: {}
  }

  type ReservationChangeLogGetPayload<S extends boolean | null | undefined | ReservationChangeLogDefaultArgs> = $Result.GetResult<Prisma.$ReservationChangeLogPayload, S>

  type ReservationChangeLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReservationChangeLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReservationChangeLogCountAggregateInputType | true
    }

  export interface ReservationChangeLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReservationChangeLog'], meta: { name: 'ReservationChangeLog' } }
    /**
     * Find zero or one ReservationChangeLog that matches the filter.
     * @param {ReservationChangeLogFindUniqueArgs} args - Arguments to find a ReservationChangeLog
     * @example
     * // Get one ReservationChangeLog
     * const reservationChangeLog = await prisma.reservationChangeLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReservationChangeLogFindUniqueArgs>(args: SelectSubset<T, ReservationChangeLogFindUniqueArgs<ExtArgs>>): Prisma__ReservationChangeLogClient<$Result.GetResult<Prisma.$ReservationChangeLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ReservationChangeLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReservationChangeLogFindUniqueOrThrowArgs} args - Arguments to find a ReservationChangeLog
     * @example
     * // Get one ReservationChangeLog
     * const reservationChangeLog = await prisma.reservationChangeLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReservationChangeLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ReservationChangeLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReservationChangeLogClient<$Result.GetResult<Prisma.$ReservationChangeLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ReservationChangeLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationChangeLogFindFirstArgs} args - Arguments to find a ReservationChangeLog
     * @example
     * // Get one ReservationChangeLog
     * const reservationChangeLog = await prisma.reservationChangeLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReservationChangeLogFindFirstArgs>(args?: SelectSubset<T, ReservationChangeLogFindFirstArgs<ExtArgs>>): Prisma__ReservationChangeLogClient<$Result.GetResult<Prisma.$ReservationChangeLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ReservationChangeLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationChangeLogFindFirstOrThrowArgs} args - Arguments to find a ReservationChangeLog
     * @example
     * // Get one ReservationChangeLog
     * const reservationChangeLog = await prisma.reservationChangeLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReservationChangeLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ReservationChangeLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReservationChangeLogClient<$Result.GetResult<Prisma.$ReservationChangeLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ReservationChangeLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationChangeLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReservationChangeLogs
     * const reservationChangeLogs = await prisma.reservationChangeLog.findMany()
     * 
     * // Get first 10 ReservationChangeLogs
     * const reservationChangeLogs = await prisma.reservationChangeLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reservationChangeLogWithIdOnly = await prisma.reservationChangeLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReservationChangeLogFindManyArgs>(args?: SelectSubset<T, ReservationChangeLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationChangeLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ReservationChangeLog.
     * @param {ReservationChangeLogCreateArgs} args - Arguments to create a ReservationChangeLog.
     * @example
     * // Create one ReservationChangeLog
     * const ReservationChangeLog = await prisma.reservationChangeLog.create({
     *   data: {
     *     // ... data to create a ReservationChangeLog
     *   }
     * })
     * 
     */
    create<T extends ReservationChangeLogCreateArgs>(args: SelectSubset<T, ReservationChangeLogCreateArgs<ExtArgs>>): Prisma__ReservationChangeLogClient<$Result.GetResult<Prisma.$ReservationChangeLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ReservationChangeLogs.
     * @param {ReservationChangeLogCreateManyArgs} args - Arguments to create many ReservationChangeLogs.
     * @example
     * // Create many ReservationChangeLogs
     * const reservationChangeLog = await prisma.reservationChangeLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReservationChangeLogCreateManyArgs>(args?: SelectSubset<T, ReservationChangeLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReservationChangeLogs and returns the data saved in the database.
     * @param {ReservationChangeLogCreateManyAndReturnArgs} args - Arguments to create many ReservationChangeLogs.
     * @example
     * // Create many ReservationChangeLogs
     * const reservationChangeLog = await prisma.reservationChangeLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReservationChangeLogs and only return the `id`
     * const reservationChangeLogWithIdOnly = await prisma.reservationChangeLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReservationChangeLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ReservationChangeLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationChangeLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ReservationChangeLog.
     * @param {ReservationChangeLogDeleteArgs} args - Arguments to delete one ReservationChangeLog.
     * @example
     * // Delete one ReservationChangeLog
     * const ReservationChangeLog = await prisma.reservationChangeLog.delete({
     *   where: {
     *     // ... filter to delete one ReservationChangeLog
     *   }
     * })
     * 
     */
    delete<T extends ReservationChangeLogDeleteArgs>(args: SelectSubset<T, ReservationChangeLogDeleteArgs<ExtArgs>>): Prisma__ReservationChangeLogClient<$Result.GetResult<Prisma.$ReservationChangeLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ReservationChangeLog.
     * @param {ReservationChangeLogUpdateArgs} args - Arguments to update one ReservationChangeLog.
     * @example
     * // Update one ReservationChangeLog
     * const reservationChangeLog = await prisma.reservationChangeLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReservationChangeLogUpdateArgs>(args: SelectSubset<T, ReservationChangeLogUpdateArgs<ExtArgs>>): Prisma__ReservationChangeLogClient<$Result.GetResult<Prisma.$ReservationChangeLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ReservationChangeLogs.
     * @param {ReservationChangeLogDeleteManyArgs} args - Arguments to filter ReservationChangeLogs to delete.
     * @example
     * // Delete a few ReservationChangeLogs
     * const { count } = await prisma.reservationChangeLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReservationChangeLogDeleteManyArgs>(args?: SelectSubset<T, ReservationChangeLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReservationChangeLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationChangeLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReservationChangeLogs
     * const reservationChangeLog = await prisma.reservationChangeLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReservationChangeLogUpdateManyArgs>(args: SelectSubset<T, ReservationChangeLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ReservationChangeLog.
     * @param {ReservationChangeLogUpsertArgs} args - Arguments to update or create a ReservationChangeLog.
     * @example
     * // Update or create a ReservationChangeLog
     * const reservationChangeLog = await prisma.reservationChangeLog.upsert({
     *   create: {
     *     // ... data to create a ReservationChangeLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReservationChangeLog we want to update
     *   }
     * })
     */
    upsert<T extends ReservationChangeLogUpsertArgs>(args: SelectSubset<T, ReservationChangeLogUpsertArgs<ExtArgs>>): Prisma__ReservationChangeLogClient<$Result.GetResult<Prisma.$ReservationChangeLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ReservationChangeLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationChangeLogCountArgs} args - Arguments to filter ReservationChangeLogs to count.
     * @example
     * // Count the number of ReservationChangeLogs
     * const count = await prisma.reservationChangeLog.count({
     *   where: {
     *     // ... the filter for the ReservationChangeLogs we want to count
     *   }
     * })
    **/
    count<T extends ReservationChangeLogCountArgs>(
      args?: Subset<T, ReservationChangeLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReservationChangeLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReservationChangeLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationChangeLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReservationChangeLogAggregateArgs>(args: Subset<T, ReservationChangeLogAggregateArgs>): Prisma.PrismaPromise<GetReservationChangeLogAggregateType<T>>

    /**
     * Group by ReservationChangeLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationChangeLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReservationChangeLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReservationChangeLogGroupByArgs['orderBy'] }
        : { orderBy?: ReservationChangeLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReservationChangeLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReservationChangeLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReservationChangeLog model
   */
  readonly fields: ReservationChangeLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReservationChangeLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReservationChangeLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reservation<T extends ReservationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReservationDefaultArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReservationChangeLog model
   */ 
  interface ReservationChangeLogFieldRefs {
    readonly id: FieldRef<"ReservationChangeLog", 'String'>
    readonly reservationId: FieldRef<"ReservationChangeLog", 'String'>
    readonly field: FieldRef<"ReservationChangeLog", 'String'>
    readonly oldValue: FieldRef<"ReservationChangeLog", 'String'>
    readonly newValue: FieldRef<"ReservationChangeLog", 'String'>
    readonly changedBy: FieldRef<"ReservationChangeLog", 'String'>
    readonly changedAt: FieldRef<"ReservationChangeLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReservationChangeLog findUnique
   */
  export type ReservationChangeLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationChangeLog
     */
    select?: ReservationChangeLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationChangeLogInclude<ExtArgs> | null
    /**
     * Filter, which ReservationChangeLog to fetch.
     */
    where: ReservationChangeLogWhereUniqueInput
  }

  /**
   * ReservationChangeLog findUniqueOrThrow
   */
  export type ReservationChangeLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationChangeLog
     */
    select?: ReservationChangeLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationChangeLogInclude<ExtArgs> | null
    /**
     * Filter, which ReservationChangeLog to fetch.
     */
    where: ReservationChangeLogWhereUniqueInput
  }

  /**
   * ReservationChangeLog findFirst
   */
  export type ReservationChangeLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationChangeLog
     */
    select?: ReservationChangeLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationChangeLogInclude<ExtArgs> | null
    /**
     * Filter, which ReservationChangeLog to fetch.
     */
    where?: ReservationChangeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReservationChangeLogs to fetch.
     */
    orderBy?: ReservationChangeLogOrderByWithRelationInput | ReservationChangeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReservationChangeLogs.
     */
    cursor?: ReservationChangeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReservationChangeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReservationChangeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReservationChangeLogs.
     */
    distinct?: ReservationChangeLogScalarFieldEnum | ReservationChangeLogScalarFieldEnum[]
  }

  /**
   * ReservationChangeLog findFirstOrThrow
   */
  export type ReservationChangeLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationChangeLog
     */
    select?: ReservationChangeLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationChangeLogInclude<ExtArgs> | null
    /**
     * Filter, which ReservationChangeLog to fetch.
     */
    where?: ReservationChangeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReservationChangeLogs to fetch.
     */
    orderBy?: ReservationChangeLogOrderByWithRelationInput | ReservationChangeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReservationChangeLogs.
     */
    cursor?: ReservationChangeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReservationChangeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReservationChangeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReservationChangeLogs.
     */
    distinct?: ReservationChangeLogScalarFieldEnum | ReservationChangeLogScalarFieldEnum[]
  }

  /**
   * ReservationChangeLog findMany
   */
  export type ReservationChangeLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationChangeLog
     */
    select?: ReservationChangeLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationChangeLogInclude<ExtArgs> | null
    /**
     * Filter, which ReservationChangeLogs to fetch.
     */
    where?: ReservationChangeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReservationChangeLogs to fetch.
     */
    orderBy?: ReservationChangeLogOrderByWithRelationInput | ReservationChangeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReservationChangeLogs.
     */
    cursor?: ReservationChangeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReservationChangeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReservationChangeLogs.
     */
    skip?: number
    distinct?: ReservationChangeLogScalarFieldEnum | ReservationChangeLogScalarFieldEnum[]
  }

  /**
   * ReservationChangeLog create
   */
  export type ReservationChangeLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationChangeLog
     */
    select?: ReservationChangeLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationChangeLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ReservationChangeLog.
     */
    data: XOR<ReservationChangeLogCreateInput, ReservationChangeLogUncheckedCreateInput>
  }

  /**
   * ReservationChangeLog createMany
   */
  export type ReservationChangeLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReservationChangeLogs.
     */
    data: ReservationChangeLogCreateManyInput | ReservationChangeLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReservationChangeLog createManyAndReturn
   */
  export type ReservationChangeLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationChangeLog
     */
    select?: ReservationChangeLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ReservationChangeLogs.
     */
    data: ReservationChangeLogCreateManyInput | ReservationChangeLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationChangeLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReservationChangeLog update
   */
  export type ReservationChangeLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationChangeLog
     */
    select?: ReservationChangeLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationChangeLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ReservationChangeLog.
     */
    data: XOR<ReservationChangeLogUpdateInput, ReservationChangeLogUncheckedUpdateInput>
    /**
     * Choose, which ReservationChangeLog to update.
     */
    where: ReservationChangeLogWhereUniqueInput
  }

  /**
   * ReservationChangeLog updateMany
   */
  export type ReservationChangeLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReservationChangeLogs.
     */
    data: XOR<ReservationChangeLogUpdateManyMutationInput, ReservationChangeLogUncheckedUpdateManyInput>
    /**
     * Filter which ReservationChangeLogs to update
     */
    where?: ReservationChangeLogWhereInput
  }

  /**
   * ReservationChangeLog upsert
   */
  export type ReservationChangeLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationChangeLog
     */
    select?: ReservationChangeLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationChangeLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ReservationChangeLog to update in case it exists.
     */
    where: ReservationChangeLogWhereUniqueInput
    /**
     * In case the ReservationChangeLog found by the `where` argument doesn't exist, create a new ReservationChangeLog with this data.
     */
    create: XOR<ReservationChangeLogCreateInput, ReservationChangeLogUncheckedCreateInput>
    /**
     * In case the ReservationChangeLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReservationChangeLogUpdateInput, ReservationChangeLogUncheckedUpdateInput>
  }

  /**
   * ReservationChangeLog delete
   */
  export type ReservationChangeLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationChangeLog
     */
    select?: ReservationChangeLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationChangeLogInclude<ExtArgs> | null
    /**
     * Filter which ReservationChangeLog to delete.
     */
    where: ReservationChangeLogWhereUniqueInput
  }

  /**
   * ReservationChangeLog deleteMany
   */
  export type ReservationChangeLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReservationChangeLogs to delete
     */
    where?: ReservationChangeLogWhereInput
  }

  /**
   * ReservationChangeLog without action
   */
  export type ReservationChangeLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationChangeLog
     */
    select?: ReservationChangeLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationChangeLogInclude<ExtArgs> | null
  }


  /**
   * Model RoomStatusHistory
   */

  export type AggregateRoomStatusHistory = {
    _count: RoomStatusHistoryCountAggregateOutputType | null
    _min: RoomStatusHistoryMinAggregateOutputType | null
    _max: RoomStatusHistoryMaxAggregateOutputType | null
  }

  export type RoomStatusHistoryMinAggregateOutputType = {
    id: string | null
    roomId: string | null
    fromStatus: string | null
    toStatus: string | null
    changedBy: string | null
    note: string | null
    changedAt: Date | null
  }

  export type RoomStatusHistoryMaxAggregateOutputType = {
    id: string | null
    roomId: string | null
    fromStatus: string | null
    toStatus: string | null
    changedBy: string | null
    note: string | null
    changedAt: Date | null
  }

  export type RoomStatusHistoryCountAggregateOutputType = {
    id: number
    roomId: number
    fromStatus: number
    toStatus: number
    changedBy: number
    note: number
    changedAt: number
    _all: number
  }


  export type RoomStatusHistoryMinAggregateInputType = {
    id?: true
    roomId?: true
    fromStatus?: true
    toStatus?: true
    changedBy?: true
    note?: true
    changedAt?: true
  }

  export type RoomStatusHistoryMaxAggregateInputType = {
    id?: true
    roomId?: true
    fromStatus?: true
    toStatus?: true
    changedBy?: true
    note?: true
    changedAt?: true
  }

  export type RoomStatusHistoryCountAggregateInputType = {
    id?: true
    roomId?: true
    fromStatus?: true
    toStatus?: true
    changedBy?: true
    note?: true
    changedAt?: true
    _all?: true
  }

  export type RoomStatusHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomStatusHistory to aggregate.
     */
    where?: RoomStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStatusHistories to fetch.
     */
    orderBy?: RoomStatusHistoryOrderByWithRelationInput | RoomStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomStatusHistories
    **/
    _count?: true | RoomStatusHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomStatusHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomStatusHistoryMaxAggregateInputType
  }

  export type GetRoomStatusHistoryAggregateType<T extends RoomStatusHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomStatusHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomStatusHistory[P]>
      : GetScalarType<T[P], AggregateRoomStatusHistory[P]>
  }




  export type RoomStatusHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomStatusHistoryWhereInput
    orderBy?: RoomStatusHistoryOrderByWithAggregationInput | RoomStatusHistoryOrderByWithAggregationInput[]
    by: RoomStatusHistoryScalarFieldEnum[] | RoomStatusHistoryScalarFieldEnum
    having?: RoomStatusHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomStatusHistoryCountAggregateInputType | true
    _min?: RoomStatusHistoryMinAggregateInputType
    _max?: RoomStatusHistoryMaxAggregateInputType
  }

  export type RoomStatusHistoryGroupByOutputType = {
    id: string
    roomId: string
    fromStatus: string | null
    toStatus: string
    changedBy: string
    note: string | null
    changedAt: Date
    _count: RoomStatusHistoryCountAggregateOutputType | null
    _min: RoomStatusHistoryMinAggregateOutputType | null
    _max: RoomStatusHistoryMaxAggregateOutputType | null
  }

  type GetRoomStatusHistoryGroupByPayload<T extends RoomStatusHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomStatusHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomStatusHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomStatusHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], RoomStatusHistoryGroupByOutputType[P]>
        }
      >
    >


  export type RoomStatusHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    fromStatus?: boolean
    toStatus?: boolean
    changedBy?: boolean
    note?: boolean
    changedAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomStatusHistory"]>

  export type RoomStatusHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    fromStatus?: boolean
    toStatus?: boolean
    changedBy?: boolean
    note?: boolean
    changedAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomStatusHistory"]>

  export type RoomStatusHistorySelectScalar = {
    id?: boolean
    roomId?: boolean
    fromStatus?: boolean
    toStatus?: boolean
    changedBy?: boolean
    note?: boolean
    changedAt?: boolean
  }

  export type RoomStatusHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }
  export type RoomStatusHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }

  export type $RoomStatusHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomStatusHistory"
    objects: {
      room: Prisma.$RoomPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomId: string
      fromStatus: string | null
      toStatus: string
      changedBy: string
      note: string | null
      changedAt: Date
    }, ExtArgs["result"]["roomStatusHistory"]>
    composites: {}
  }

  type RoomStatusHistoryGetPayload<S extends boolean | null | undefined | RoomStatusHistoryDefaultArgs> = $Result.GetResult<Prisma.$RoomStatusHistoryPayload, S>

  type RoomStatusHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RoomStatusHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RoomStatusHistoryCountAggregateInputType | true
    }

  export interface RoomStatusHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomStatusHistory'], meta: { name: 'RoomStatusHistory' } }
    /**
     * Find zero or one RoomStatusHistory that matches the filter.
     * @param {RoomStatusHistoryFindUniqueArgs} args - Arguments to find a RoomStatusHistory
     * @example
     * // Get one RoomStatusHistory
     * const roomStatusHistory = await prisma.roomStatusHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomStatusHistoryFindUniqueArgs>(args: SelectSubset<T, RoomStatusHistoryFindUniqueArgs<ExtArgs>>): Prisma__RoomStatusHistoryClient<$Result.GetResult<Prisma.$RoomStatusHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RoomStatusHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RoomStatusHistoryFindUniqueOrThrowArgs} args - Arguments to find a RoomStatusHistory
     * @example
     * // Get one RoomStatusHistory
     * const roomStatusHistory = await prisma.roomStatusHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomStatusHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomStatusHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomStatusHistoryClient<$Result.GetResult<Prisma.$RoomStatusHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RoomStatusHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusHistoryFindFirstArgs} args - Arguments to find a RoomStatusHistory
     * @example
     * // Get one RoomStatusHistory
     * const roomStatusHistory = await prisma.roomStatusHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomStatusHistoryFindFirstArgs>(args?: SelectSubset<T, RoomStatusHistoryFindFirstArgs<ExtArgs>>): Prisma__RoomStatusHistoryClient<$Result.GetResult<Prisma.$RoomStatusHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RoomStatusHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusHistoryFindFirstOrThrowArgs} args - Arguments to find a RoomStatusHistory
     * @example
     * // Get one RoomStatusHistory
     * const roomStatusHistory = await prisma.roomStatusHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomStatusHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomStatusHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomStatusHistoryClient<$Result.GetResult<Prisma.$RoomStatusHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RoomStatusHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomStatusHistories
     * const roomStatusHistories = await prisma.roomStatusHistory.findMany()
     * 
     * // Get first 10 RoomStatusHistories
     * const roomStatusHistories = await prisma.roomStatusHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomStatusHistoryWithIdOnly = await prisma.roomStatusHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomStatusHistoryFindManyArgs>(args?: SelectSubset<T, RoomStatusHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStatusHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RoomStatusHistory.
     * @param {RoomStatusHistoryCreateArgs} args - Arguments to create a RoomStatusHistory.
     * @example
     * // Create one RoomStatusHistory
     * const RoomStatusHistory = await prisma.roomStatusHistory.create({
     *   data: {
     *     // ... data to create a RoomStatusHistory
     *   }
     * })
     * 
     */
    create<T extends RoomStatusHistoryCreateArgs>(args: SelectSubset<T, RoomStatusHistoryCreateArgs<ExtArgs>>): Prisma__RoomStatusHistoryClient<$Result.GetResult<Prisma.$RoomStatusHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RoomStatusHistories.
     * @param {RoomStatusHistoryCreateManyArgs} args - Arguments to create many RoomStatusHistories.
     * @example
     * // Create many RoomStatusHistories
     * const roomStatusHistory = await prisma.roomStatusHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomStatusHistoryCreateManyArgs>(args?: SelectSubset<T, RoomStatusHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomStatusHistories and returns the data saved in the database.
     * @param {RoomStatusHistoryCreateManyAndReturnArgs} args - Arguments to create many RoomStatusHistories.
     * @example
     * // Create many RoomStatusHistories
     * const roomStatusHistory = await prisma.roomStatusHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomStatusHistories and only return the `id`
     * const roomStatusHistoryWithIdOnly = await prisma.roomStatusHistory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomStatusHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomStatusHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStatusHistoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RoomStatusHistory.
     * @param {RoomStatusHistoryDeleteArgs} args - Arguments to delete one RoomStatusHistory.
     * @example
     * // Delete one RoomStatusHistory
     * const RoomStatusHistory = await prisma.roomStatusHistory.delete({
     *   where: {
     *     // ... filter to delete one RoomStatusHistory
     *   }
     * })
     * 
     */
    delete<T extends RoomStatusHistoryDeleteArgs>(args: SelectSubset<T, RoomStatusHistoryDeleteArgs<ExtArgs>>): Prisma__RoomStatusHistoryClient<$Result.GetResult<Prisma.$RoomStatusHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RoomStatusHistory.
     * @param {RoomStatusHistoryUpdateArgs} args - Arguments to update one RoomStatusHistory.
     * @example
     * // Update one RoomStatusHistory
     * const roomStatusHistory = await prisma.roomStatusHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomStatusHistoryUpdateArgs>(args: SelectSubset<T, RoomStatusHistoryUpdateArgs<ExtArgs>>): Prisma__RoomStatusHistoryClient<$Result.GetResult<Prisma.$RoomStatusHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RoomStatusHistories.
     * @param {RoomStatusHistoryDeleteManyArgs} args - Arguments to filter RoomStatusHistories to delete.
     * @example
     * // Delete a few RoomStatusHistories
     * const { count } = await prisma.roomStatusHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomStatusHistoryDeleteManyArgs>(args?: SelectSubset<T, RoomStatusHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomStatusHistories
     * const roomStatusHistory = await prisma.roomStatusHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomStatusHistoryUpdateManyArgs>(args: SelectSubset<T, RoomStatusHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RoomStatusHistory.
     * @param {RoomStatusHistoryUpsertArgs} args - Arguments to update or create a RoomStatusHistory.
     * @example
     * // Update or create a RoomStatusHistory
     * const roomStatusHistory = await prisma.roomStatusHistory.upsert({
     *   create: {
     *     // ... data to create a RoomStatusHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomStatusHistory we want to update
     *   }
     * })
     */
    upsert<T extends RoomStatusHistoryUpsertArgs>(args: SelectSubset<T, RoomStatusHistoryUpsertArgs<ExtArgs>>): Prisma__RoomStatusHistoryClient<$Result.GetResult<Prisma.$RoomStatusHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RoomStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusHistoryCountArgs} args - Arguments to filter RoomStatusHistories to count.
     * @example
     * // Count the number of RoomStatusHistories
     * const count = await prisma.roomStatusHistory.count({
     *   where: {
     *     // ... the filter for the RoomStatusHistories we want to count
     *   }
     * })
    **/
    count<T extends RoomStatusHistoryCountArgs>(
      args?: Subset<T, RoomStatusHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomStatusHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomStatusHistoryAggregateArgs>(args: Subset<T, RoomStatusHistoryAggregateArgs>): Prisma.PrismaPromise<GetRoomStatusHistoryAggregateType<T>>

    /**
     * Group by RoomStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomStatusHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomStatusHistoryGroupByArgs['orderBy'] }
        : { orderBy?: RoomStatusHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomStatusHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomStatusHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomStatusHistory model
   */
  readonly fields: RoomStatusHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomStatusHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomStatusHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoomStatusHistory model
   */ 
  interface RoomStatusHistoryFieldRefs {
    readonly id: FieldRef<"RoomStatusHistory", 'String'>
    readonly roomId: FieldRef<"RoomStatusHistory", 'String'>
    readonly fromStatus: FieldRef<"RoomStatusHistory", 'String'>
    readonly toStatus: FieldRef<"RoomStatusHistory", 'String'>
    readonly changedBy: FieldRef<"RoomStatusHistory", 'String'>
    readonly note: FieldRef<"RoomStatusHistory", 'String'>
    readonly changedAt: FieldRef<"RoomStatusHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoomStatusHistory findUnique
   */
  export type RoomStatusHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatusHistory
     */
    select?: RoomStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which RoomStatusHistory to fetch.
     */
    where: RoomStatusHistoryWhereUniqueInput
  }

  /**
   * RoomStatusHistory findUniqueOrThrow
   */
  export type RoomStatusHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatusHistory
     */
    select?: RoomStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which RoomStatusHistory to fetch.
     */
    where: RoomStatusHistoryWhereUniqueInput
  }

  /**
   * RoomStatusHistory findFirst
   */
  export type RoomStatusHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatusHistory
     */
    select?: RoomStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which RoomStatusHistory to fetch.
     */
    where?: RoomStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStatusHistories to fetch.
     */
    orderBy?: RoomStatusHistoryOrderByWithRelationInput | RoomStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomStatusHistories.
     */
    cursor?: RoomStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomStatusHistories.
     */
    distinct?: RoomStatusHistoryScalarFieldEnum | RoomStatusHistoryScalarFieldEnum[]
  }

  /**
   * RoomStatusHistory findFirstOrThrow
   */
  export type RoomStatusHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatusHistory
     */
    select?: RoomStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which RoomStatusHistory to fetch.
     */
    where?: RoomStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStatusHistories to fetch.
     */
    orderBy?: RoomStatusHistoryOrderByWithRelationInput | RoomStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomStatusHistories.
     */
    cursor?: RoomStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomStatusHistories.
     */
    distinct?: RoomStatusHistoryScalarFieldEnum | RoomStatusHistoryScalarFieldEnum[]
  }

  /**
   * RoomStatusHistory findMany
   */
  export type RoomStatusHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatusHistory
     */
    select?: RoomStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which RoomStatusHistories to fetch.
     */
    where?: RoomStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStatusHistories to fetch.
     */
    orderBy?: RoomStatusHistoryOrderByWithRelationInput | RoomStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomStatusHistories.
     */
    cursor?: RoomStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStatusHistories.
     */
    skip?: number
    distinct?: RoomStatusHistoryScalarFieldEnum | RoomStatusHistoryScalarFieldEnum[]
  }

  /**
   * RoomStatusHistory create
   */
  export type RoomStatusHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatusHistory
     */
    select?: RoomStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomStatusHistory.
     */
    data: XOR<RoomStatusHistoryCreateInput, RoomStatusHistoryUncheckedCreateInput>
  }

  /**
   * RoomStatusHistory createMany
   */
  export type RoomStatusHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomStatusHistories.
     */
    data: RoomStatusHistoryCreateManyInput | RoomStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomStatusHistory createManyAndReturn
   */
  export type RoomStatusHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatusHistory
     */
    select?: RoomStatusHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RoomStatusHistories.
     */
    data: RoomStatusHistoryCreateManyInput | RoomStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomStatusHistory update
   */
  export type RoomStatusHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatusHistory
     */
    select?: RoomStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomStatusHistory.
     */
    data: XOR<RoomStatusHistoryUpdateInput, RoomStatusHistoryUncheckedUpdateInput>
    /**
     * Choose, which RoomStatusHistory to update.
     */
    where: RoomStatusHistoryWhereUniqueInput
  }

  /**
   * RoomStatusHistory updateMany
   */
  export type RoomStatusHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomStatusHistories.
     */
    data: XOR<RoomStatusHistoryUpdateManyMutationInput, RoomStatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which RoomStatusHistories to update
     */
    where?: RoomStatusHistoryWhereInput
  }

  /**
   * RoomStatusHistory upsert
   */
  export type RoomStatusHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatusHistory
     */
    select?: RoomStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomStatusHistory to update in case it exists.
     */
    where: RoomStatusHistoryWhereUniqueInput
    /**
     * In case the RoomStatusHistory found by the `where` argument doesn't exist, create a new RoomStatusHistory with this data.
     */
    create: XOR<RoomStatusHistoryCreateInput, RoomStatusHistoryUncheckedCreateInput>
    /**
     * In case the RoomStatusHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomStatusHistoryUpdateInput, RoomStatusHistoryUncheckedUpdateInput>
  }

  /**
   * RoomStatusHistory delete
   */
  export type RoomStatusHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatusHistory
     */
    select?: RoomStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter which RoomStatusHistory to delete.
     */
    where: RoomStatusHistoryWhereUniqueInput
  }

  /**
   * RoomStatusHistory deleteMany
   */
  export type RoomStatusHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomStatusHistories to delete
     */
    where?: RoomStatusHistoryWhereInput
  }

  /**
   * RoomStatusHistory without action
   */
  export type RoomStatusHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatusHistory
     */
    select?: RoomStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusHistoryInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RoomTypeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    basePrice: 'basePrice',
    maxGuests: 'maxGuests',
    bedType: 'bedType',
    amenities: 'amenities',
    isActive: 'isActive'
  };

  export type RoomTypeScalarFieldEnum = (typeof RoomTypeScalarFieldEnum)[keyof typeof RoomTypeScalarFieldEnum]


  export const RoomTypePhotoScalarFieldEnum: {
    id: 'id',
    roomTypeId: 'roomTypeId',
    filename: 'filename',
    url: 'url',
    uploadedAt: 'uploadedAt'
  };

  export type RoomTypePhotoScalarFieldEnum = (typeof RoomTypePhotoScalarFieldEnum)[keyof typeof RoomTypePhotoScalarFieldEnum]


  export const RoomScalarFieldEnum: {
    id: 'id',
    roomTypeId: 'roomTypeId',
    roomNumber: 'roomNumber',
    floor: 'floor',
    status: 'status',
    isActive: 'isActive'
  };

  export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum]


  export const GuestScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    fullName: 'fullName',
    phone: 'phone',
    email: 'email'
  };

  export type GuestScalarFieldEnum = (typeof GuestScalarFieldEnum)[keyof typeof GuestScalarFieldEnum]


  export const ReservationScalarFieldEnum: {
    id: 'id',
    idempotencyKey: 'idempotencyKey',
    reference: 'reference',
    guestId: 'guestId',
    roomTypeId: 'roomTypeId',
    roomId: 'roomId',
    checkIn: 'checkIn',
    checkOut: 'checkOut',
    guestCount: 'guestCount',
    specialRequest: 'specialRequest',
    status: 'status',
    source: 'source',
    rateSnapshot: 'rateSnapshot',
    taxRateBp: 'taxRateBp',
    totalAmount: 'totalAmount',
    holdExpiresAt: 'holdExpiresAt',
    createdBy: 'createdBy',
    createdAt: 'createdAt'
  };

  export type ReservationScalarFieldEnum = (typeof ReservationScalarFieldEnum)[keyof typeof ReservationScalarFieldEnum]


  export const ReservationStatusHistoryScalarFieldEnum: {
    id: 'id',
    reservationId: 'reservationId',
    fromStatus: 'fromStatus',
    toStatus: 'toStatus',
    changedBy: 'changedBy',
    reason: 'reason',
    changedAt: 'changedAt'
  };

  export type ReservationStatusHistoryScalarFieldEnum = (typeof ReservationStatusHistoryScalarFieldEnum)[keyof typeof ReservationStatusHistoryScalarFieldEnum]


  export const ReservationChangeLogScalarFieldEnum: {
    id: 'id',
    reservationId: 'reservationId',
    field: 'field',
    oldValue: 'oldValue',
    newValue: 'newValue',
    changedBy: 'changedBy',
    changedAt: 'changedAt'
  };

  export type ReservationChangeLogScalarFieldEnum = (typeof ReservationChangeLogScalarFieldEnum)[keyof typeof ReservationChangeLogScalarFieldEnum]


  export const RoomStatusHistoryScalarFieldEnum: {
    id: 'id',
    roomId: 'roomId',
    fromStatus: 'fromStatus',
    toStatus: 'toStatus',
    changedBy: 'changedBy',
    note: 'note',
    changedAt: 'changedAt'
  };

  export type RoomStatusHistoryScalarFieldEnum = (typeof RoomStatusHistoryScalarFieldEnum)[keyof typeof RoomStatusHistoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'RoomStatus'
   */
  export type EnumRoomStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoomStatus'>
    


  /**
   * Reference to a field of type 'RoomStatus[]'
   */
  export type ListEnumRoomStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoomStatus[]'>
    


  /**
   * Reference to a field of type 'ReservationStatus'
   */
  export type EnumReservationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReservationStatus'>
    


  /**
   * Reference to a field of type 'ReservationStatus[]'
   */
  export type ListEnumReservationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReservationStatus[]'>
    


  /**
   * Reference to a field of type 'ReservationSource'
   */
  export type EnumReservationSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReservationSource'>
    


  /**
   * Reference to a field of type 'ReservationSource[]'
   */
  export type ListEnumReservationSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReservationSource[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type RoomTypeWhereInput = {
    AND?: RoomTypeWhereInput | RoomTypeWhereInput[]
    OR?: RoomTypeWhereInput[]
    NOT?: RoomTypeWhereInput | RoomTypeWhereInput[]
    id?: StringFilter<"RoomType"> | string
    name?: StringFilter<"RoomType"> | string
    description?: StringNullableFilter<"RoomType"> | string | null
    basePrice?: IntFilter<"RoomType"> | number
    maxGuests?: IntFilter<"RoomType"> | number
    bedType?: StringNullableFilter<"RoomType"> | string | null
    amenities?: JsonNullableFilter<"RoomType">
    isActive?: BoolFilter<"RoomType"> | boolean
    rooms?: RoomListRelationFilter
    reservations?: ReservationListRelationFilter
    photos?: RoomTypePhotoListRelationFilter
  }

  export type RoomTypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    basePrice?: SortOrder
    maxGuests?: SortOrder
    bedType?: SortOrderInput | SortOrder
    amenities?: SortOrderInput | SortOrder
    isActive?: SortOrder
    rooms?: RoomOrderByRelationAggregateInput
    reservations?: ReservationOrderByRelationAggregateInput
    photos?: RoomTypePhotoOrderByRelationAggregateInput
  }

  export type RoomTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: RoomTypeWhereInput | RoomTypeWhereInput[]
    OR?: RoomTypeWhereInput[]
    NOT?: RoomTypeWhereInput | RoomTypeWhereInput[]
    description?: StringNullableFilter<"RoomType"> | string | null
    basePrice?: IntFilter<"RoomType"> | number
    maxGuests?: IntFilter<"RoomType"> | number
    bedType?: StringNullableFilter<"RoomType"> | string | null
    amenities?: JsonNullableFilter<"RoomType">
    isActive?: BoolFilter<"RoomType"> | boolean
    rooms?: RoomListRelationFilter
    reservations?: ReservationListRelationFilter
    photos?: RoomTypePhotoListRelationFilter
  }, "id" | "name">

  export type RoomTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    basePrice?: SortOrder
    maxGuests?: SortOrder
    bedType?: SortOrderInput | SortOrder
    amenities?: SortOrderInput | SortOrder
    isActive?: SortOrder
    _count?: RoomTypeCountOrderByAggregateInput
    _avg?: RoomTypeAvgOrderByAggregateInput
    _max?: RoomTypeMaxOrderByAggregateInput
    _min?: RoomTypeMinOrderByAggregateInput
    _sum?: RoomTypeSumOrderByAggregateInput
  }

  export type RoomTypeScalarWhereWithAggregatesInput = {
    AND?: RoomTypeScalarWhereWithAggregatesInput | RoomTypeScalarWhereWithAggregatesInput[]
    OR?: RoomTypeScalarWhereWithAggregatesInput[]
    NOT?: RoomTypeScalarWhereWithAggregatesInput | RoomTypeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoomType"> | string
    name?: StringWithAggregatesFilter<"RoomType"> | string
    description?: StringNullableWithAggregatesFilter<"RoomType"> | string | null
    basePrice?: IntWithAggregatesFilter<"RoomType"> | number
    maxGuests?: IntWithAggregatesFilter<"RoomType"> | number
    bedType?: StringNullableWithAggregatesFilter<"RoomType"> | string | null
    amenities?: JsonNullableWithAggregatesFilter<"RoomType">
    isActive?: BoolWithAggregatesFilter<"RoomType"> | boolean
  }

  export type RoomTypePhotoWhereInput = {
    AND?: RoomTypePhotoWhereInput | RoomTypePhotoWhereInput[]
    OR?: RoomTypePhotoWhereInput[]
    NOT?: RoomTypePhotoWhereInput | RoomTypePhotoWhereInput[]
    id?: StringFilter<"RoomTypePhoto"> | string
    roomTypeId?: StringFilter<"RoomTypePhoto"> | string
    filename?: StringFilter<"RoomTypePhoto"> | string
    url?: StringFilter<"RoomTypePhoto"> | string
    uploadedAt?: DateTimeFilter<"RoomTypePhoto"> | Date | string
    roomType?: XOR<RoomTypeRelationFilter, RoomTypeWhereInput>
  }

  export type RoomTypePhotoOrderByWithRelationInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    filename?: SortOrder
    url?: SortOrder
    uploadedAt?: SortOrder
    roomType?: RoomTypeOrderByWithRelationInput
  }

  export type RoomTypePhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoomTypePhotoWhereInput | RoomTypePhotoWhereInput[]
    OR?: RoomTypePhotoWhereInput[]
    NOT?: RoomTypePhotoWhereInput | RoomTypePhotoWhereInput[]
    roomTypeId?: StringFilter<"RoomTypePhoto"> | string
    filename?: StringFilter<"RoomTypePhoto"> | string
    url?: StringFilter<"RoomTypePhoto"> | string
    uploadedAt?: DateTimeFilter<"RoomTypePhoto"> | Date | string
    roomType?: XOR<RoomTypeRelationFilter, RoomTypeWhereInput>
  }, "id">

  export type RoomTypePhotoOrderByWithAggregationInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    filename?: SortOrder
    url?: SortOrder
    uploadedAt?: SortOrder
    _count?: RoomTypePhotoCountOrderByAggregateInput
    _max?: RoomTypePhotoMaxOrderByAggregateInput
    _min?: RoomTypePhotoMinOrderByAggregateInput
  }

  export type RoomTypePhotoScalarWhereWithAggregatesInput = {
    AND?: RoomTypePhotoScalarWhereWithAggregatesInput | RoomTypePhotoScalarWhereWithAggregatesInput[]
    OR?: RoomTypePhotoScalarWhereWithAggregatesInput[]
    NOT?: RoomTypePhotoScalarWhereWithAggregatesInput | RoomTypePhotoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoomTypePhoto"> | string
    roomTypeId?: StringWithAggregatesFilter<"RoomTypePhoto"> | string
    filename?: StringWithAggregatesFilter<"RoomTypePhoto"> | string
    url?: StringWithAggregatesFilter<"RoomTypePhoto"> | string
    uploadedAt?: DateTimeWithAggregatesFilter<"RoomTypePhoto"> | Date | string
  }

  export type RoomWhereInput = {
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    id?: StringFilter<"Room"> | string
    roomTypeId?: StringFilter<"Room"> | string
    roomNumber?: StringFilter<"Room"> | string
    floor?: IntNullableFilter<"Room"> | number | null
    status?: EnumRoomStatusFilter<"Room"> | $Enums.RoomStatus
    isActive?: BoolFilter<"Room"> | boolean
    roomType?: XOR<RoomTypeRelationFilter, RoomTypeWhereInput>
    reservations?: ReservationListRelationFilter
    history?: RoomStatusHistoryListRelationFilter
  }

  export type RoomOrderByWithRelationInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    roomNumber?: SortOrder
    floor?: SortOrderInput | SortOrder
    status?: SortOrder
    isActive?: SortOrder
    roomType?: RoomTypeOrderByWithRelationInput
    reservations?: ReservationOrderByRelationAggregateInput
    history?: RoomStatusHistoryOrderByRelationAggregateInput
  }

  export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    roomNumber?: string
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    roomTypeId?: StringFilter<"Room"> | string
    floor?: IntNullableFilter<"Room"> | number | null
    status?: EnumRoomStatusFilter<"Room"> | $Enums.RoomStatus
    isActive?: BoolFilter<"Room"> | boolean
    roomType?: XOR<RoomTypeRelationFilter, RoomTypeWhereInput>
    reservations?: ReservationListRelationFilter
    history?: RoomStatusHistoryListRelationFilter
  }, "id" | "roomNumber">

  export type RoomOrderByWithAggregationInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    roomNumber?: SortOrder
    floor?: SortOrderInput | SortOrder
    status?: SortOrder
    isActive?: SortOrder
    _count?: RoomCountOrderByAggregateInput
    _avg?: RoomAvgOrderByAggregateInput
    _max?: RoomMaxOrderByAggregateInput
    _min?: RoomMinOrderByAggregateInput
    _sum?: RoomSumOrderByAggregateInput
  }

  export type RoomScalarWhereWithAggregatesInput = {
    AND?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    OR?: RoomScalarWhereWithAggregatesInput[]
    NOT?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Room"> | string
    roomTypeId?: StringWithAggregatesFilter<"Room"> | string
    roomNumber?: StringWithAggregatesFilter<"Room"> | string
    floor?: IntNullableWithAggregatesFilter<"Room"> | number | null
    status?: EnumRoomStatusWithAggregatesFilter<"Room"> | $Enums.RoomStatus
    isActive?: BoolWithAggregatesFilter<"Room"> | boolean
  }

  export type GuestWhereInput = {
    AND?: GuestWhereInput | GuestWhereInput[]
    OR?: GuestWhereInput[]
    NOT?: GuestWhereInput | GuestWhereInput[]
    id?: StringFilter<"Guest"> | string
    userId?: StringNullableFilter<"Guest"> | string | null
    fullName?: StringFilter<"Guest"> | string
    phone?: StringNullableFilter<"Guest"> | string | null
    email?: StringNullableFilter<"Guest"> | string | null
    reservations?: ReservationListRelationFilter
  }

  export type GuestOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    fullName?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    reservations?: ReservationOrderByRelationAggregateInput
  }

  export type GuestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GuestWhereInput | GuestWhereInput[]
    OR?: GuestWhereInput[]
    NOT?: GuestWhereInput | GuestWhereInput[]
    userId?: StringNullableFilter<"Guest"> | string | null
    fullName?: StringFilter<"Guest"> | string
    phone?: StringNullableFilter<"Guest"> | string | null
    email?: StringNullableFilter<"Guest"> | string | null
    reservations?: ReservationListRelationFilter
  }, "id">

  export type GuestOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    fullName?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    _count?: GuestCountOrderByAggregateInput
    _max?: GuestMaxOrderByAggregateInput
    _min?: GuestMinOrderByAggregateInput
  }

  export type GuestScalarWhereWithAggregatesInput = {
    AND?: GuestScalarWhereWithAggregatesInput | GuestScalarWhereWithAggregatesInput[]
    OR?: GuestScalarWhereWithAggregatesInput[]
    NOT?: GuestScalarWhereWithAggregatesInput | GuestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Guest"> | string
    userId?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    fullName?: StringWithAggregatesFilter<"Guest"> | string
    phone?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    email?: StringNullableWithAggregatesFilter<"Guest"> | string | null
  }

  export type ReservationWhereInput = {
    AND?: ReservationWhereInput | ReservationWhereInput[]
    OR?: ReservationWhereInput[]
    NOT?: ReservationWhereInput | ReservationWhereInput[]
    id?: StringFilter<"Reservation"> | string
    idempotencyKey?: StringFilter<"Reservation"> | string
    reference?: StringFilter<"Reservation"> | string
    guestId?: StringFilter<"Reservation"> | string
    roomTypeId?: StringFilter<"Reservation"> | string
    roomId?: StringNullableFilter<"Reservation"> | string | null
    checkIn?: DateTimeFilter<"Reservation"> | Date | string
    checkOut?: DateTimeFilter<"Reservation"> | Date | string
    guestCount?: IntFilter<"Reservation"> | number
    specialRequest?: StringNullableFilter<"Reservation"> | string | null
    status?: EnumReservationStatusFilter<"Reservation"> | $Enums.ReservationStatus
    source?: EnumReservationSourceFilter<"Reservation"> | $Enums.ReservationSource
    rateSnapshot?: IntFilter<"Reservation"> | number
    taxRateBp?: IntFilter<"Reservation"> | number
    totalAmount?: IntFilter<"Reservation"> | number
    holdExpiresAt?: DateTimeNullableFilter<"Reservation"> | Date | string | null
    createdBy?: StringFilter<"Reservation"> | string
    createdAt?: DateTimeFilter<"Reservation"> | Date | string
    guest?: XOR<GuestRelationFilter, GuestWhereInput>
    roomType?: XOR<RoomTypeRelationFilter, RoomTypeWhereInput>
    room?: XOR<RoomNullableRelationFilter, RoomWhereInput> | null
    history?: ReservationStatusHistoryListRelationFilter
    changeLog?: ReservationChangeLogListRelationFilter
  }

  export type ReservationOrderByWithRelationInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    reference?: SortOrder
    guestId?: SortOrder
    roomTypeId?: SortOrder
    roomId?: SortOrderInput | SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    guestCount?: SortOrder
    specialRequest?: SortOrderInput | SortOrder
    status?: SortOrder
    source?: SortOrder
    rateSnapshot?: SortOrder
    taxRateBp?: SortOrder
    totalAmount?: SortOrder
    holdExpiresAt?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    guest?: GuestOrderByWithRelationInput
    roomType?: RoomTypeOrderByWithRelationInput
    room?: RoomOrderByWithRelationInput
    history?: ReservationStatusHistoryOrderByRelationAggregateInput
    changeLog?: ReservationChangeLogOrderByRelationAggregateInput
  }

  export type ReservationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    idempotencyKey?: string
    reference?: string
    AND?: ReservationWhereInput | ReservationWhereInput[]
    OR?: ReservationWhereInput[]
    NOT?: ReservationWhereInput | ReservationWhereInput[]
    guestId?: StringFilter<"Reservation"> | string
    roomTypeId?: StringFilter<"Reservation"> | string
    roomId?: StringNullableFilter<"Reservation"> | string | null
    checkIn?: DateTimeFilter<"Reservation"> | Date | string
    checkOut?: DateTimeFilter<"Reservation"> | Date | string
    guestCount?: IntFilter<"Reservation"> | number
    specialRequest?: StringNullableFilter<"Reservation"> | string | null
    status?: EnumReservationStatusFilter<"Reservation"> | $Enums.ReservationStatus
    source?: EnumReservationSourceFilter<"Reservation"> | $Enums.ReservationSource
    rateSnapshot?: IntFilter<"Reservation"> | number
    taxRateBp?: IntFilter<"Reservation"> | number
    totalAmount?: IntFilter<"Reservation"> | number
    holdExpiresAt?: DateTimeNullableFilter<"Reservation"> | Date | string | null
    createdBy?: StringFilter<"Reservation"> | string
    createdAt?: DateTimeFilter<"Reservation"> | Date | string
    guest?: XOR<GuestRelationFilter, GuestWhereInput>
    roomType?: XOR<RoomTypeRelationFilter, RoomTypeWhereInput>
    room?: XOR<RoomNullableRelationFilter, RoomWhereInput> | null
    history?: ReservationStatusHistoryListRelationFilter
    changeLog?: ReservationChangeLogListRelationFilter
  }, "id" | "idempotencyKey" | "reference">

  export type ReservationOrderByWithAggregationInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    reference?: SortOrder
    guestId?: SortOrder
    roomTypeId?: SortOrder
    roomId?: SortOrderInput | SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    guestCount?: SortOrder
    specialRequest?: SortOrderInput | SortOrder
    status?: SortOrder
    source?: SortOrder
    rateSnapshot?: SortOrder
    taxRateBp?: SortOrder
    totalAmount?: SortOrder
    holdExpiresAt?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    _count?: ReservationCountOrderByAggregateInput
    _avg?: ReservationAvgOrderByAggregateInput
    _max?: ReservationMaxOrderByAggregateInput
    _min?: ReservationMinOrderByAggregateInput
    _sum?: ReservationSumOrderByAggregateInput
  }

  export type ReservationScalarWhereWithAggregatesInput = {
    AND?: ReservationScalarWhereWithAggregatesInput | ReservationScalarWhereWithAggregatesInput[]
    OR?: ReservationScalarWhereWithAggregatesInput[]
    NOT?: ReservationScalarWhereWithAggregatesInput | ReservationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Reservation"> | string
    idempotencyKey?: StringWithAggregatesFilter<"Reservation"> | string
    reference?: StringWithAggregatesFilter<"Reservation"> | string
    guestId?: StringWithAggregatesFilter<"Reservation"> | string
    roomTypeId?: StringWithAggregatesFilter<"Reservation"> | string
    roomId?: StringNullableWithAggregatesFilter<"Reservation"> | string | null
    checkIn?: DateTimeWithAggregatesFilter<"Reservation"> | Date | string
    checkOut?: DateTimeWithAggregatesFilter<"Reservation"> | Date | string
    guestCount?: IntWithAggregatesFilter<"Reservation"> | number
    specialRequest?: StringNullableWithAggregatesFilter<"Reservation"> | string | null
    status?: EnumReservationStatusWithAggregatesFilter<"Reservation"> | $Enums.ReservationStatus
    source?: EnumReservationSourceWithAggregatesFilter<"Reservation"> | $Enums.ReservationSource
    rateSnapshot?: IntWithAggregatesFilter<"Reservation"> | number
    taxRateBp?: IntWithAggregatesFilter<"Reservation"> | number
    totalAmount?: IntWithAggregatesFilter<"Reservation"> | number
    holdExpiresAt?: DateTimeNullableWithAggregatesFilter<"Reservation"> | Date | string | null
    createdBy?: StringWithAggregatesFilter<"Reservation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Reservation"> | Date | string
  }

  export type ReservationStatusHistoryWhereInput = {
    AND?: ReservationStatusHistoryWhereInput | ReservationStatusHistoryWhereInput[]
    OR?: ReservationStatusHistoryWhereInput[]
    NOT?: ReservationStatusHistoryWhereInput | ReservationStatusHistoryWhereInput[]
    id?: StringFilter<"ReservationStatusHistory"> | string
    reservationId?: StringFilter<"ReservationStatusHistory"> | string
    fromStatus?: StringNullableFilter<"ReservationStatusHistory"> | string | null
    toStatus?: StringFilter<"ReservationStatusHistory"> | string
    changedBy?: StringFilter<"ReservationStatusHistory"> | string
    reason?: StringNullableFilter<"ReservationStatusHistory"> | string | null
    changedAt?: DateTimeFilter<"ReservationStatusHistory"> | Date | string
    reservation?: XOR<ReservationRelationFilter, ReservationWhereInput>
  }

  export type ReservationStatusHistoryOrderByWithRelationInput = {
    id?: SortOrder
    reservationId?: SortOrder
    fromStatus?: SortOrderInput | SortOrder
    toStatus?: SortOrder
    changedBy?: SortOrder
    reason?: SortOrderInput | SortOrder
    changedAt?: SortOrder
    reservation?: ReservationOrderByWithRelationInput
  }

  export type ReservationStatusHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReservationStatusHistoryWhereInput | ReservationStatusHistoryWhereInput[]
    OR?: ReservationStatusHistoryWhereInput[]
    NOT?: ReservationStatusHistoryWhereInput | ReservationStatusHistoryWhereInput[]
    reservationId?: StringFilter<"ReservationStatusHistory"> | string
    fromStatus?: StringNullableFilter<"ReservationStatusHistory"> | string | null
    toStatus?: StringFilter<"ReservationStatusHistory"> | string
    changedBy?: StringFilter<"ReservationStatusHistory"> | string
    reason?: StringNullableFilter<"ReservationStatusHistory"> | string | null
    changedAt?: DateTimeFilter<"ReservationStatusHistory"> | Date | string
    reservation?: XOR<ReservationRelationFilter, ReservationWhereInput>
  }, "id">

  export type ReservationStatusHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    reservationId?: SortOrder
    fromStatus?: SortOrderInput | SortOrder
    toStatus?: SortOrder
    changedBy?: SortOrder
    reason?: SortOrderInput | SortOrder
    changedAt?: SortOrder
    _count?: ReservationStatusHistoryCountOrderByAggregateInput
    _max?: ReservationStatusHistoryMaxOrderByAggregateInput
    _min?: ReservationStatusHistoryMinOrderByAggregateInput
  }

  export type ReservationStatusHistoryScalarWhereWithAggregatesInput = {
    AND?: ReservationStatusHistoryScalarWhereWithAggregatesInput | ReservationStatusHistoryScalarWhereWithAggregatesInput[]
    OR?: ReservationStatusHistoryScalarWhereWithAggregatesInput[]
    NOT?: ReservationStatusHistoryScalarWhereWithAggregatesInput | ReservationStatusHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReservationStatusHistory"> | string
    reservationId?: StringWithAggregatesFilter<"ReservationStatusHistory"> | string
    fromStatus?: StringNullableWithAggregatesFilter<"ReservationStatusHistory"> | string | null
    toStatus?: StringWithAggregatesFilter<"ReservationStatusHistory"> | string
    changedBy?: StringWithAggregatesFilter<"ReservationStatusHistory"> | string
    reason?: StringNullableWithAggregatesFilter<"ReservationStatusHistory"> | string | null
    changedAt?: DateTimeWithAggregatesFilter<"ReservationStatusHistory"> | Date | string
  }

  export type ReservationChangeLogWhereInput = {
    AND?: ReservationChangeLogWhereInput | ReservationChangeLogWhereInput[]
    OR?: ReservationChangeLogWhereInput[]
    NOT?: ReservationChangeLogWhereInput | ReservationChangeLogWhereInput[]
    id?: StringFilter<"ReservationChangeLog"> | string
    reservationId?: StringFilter<"ReservationChangeLog"> | string
    field?: StringFilter<"ReservationChangeLog"> | string
    oldValue?: StringNullableFilter<"ReservationChangeLog"> | string | null
    newValue?: StringNullableFilter<"ReservationChangeLog"> | string | null
    changedBy?: StringFilter<"ReservationChangeLog"> | string
    changedAt?: DateTimeFilter<"ReservationChangeLog"> | Date | string
    reservation?: XOR<ReservationRelationFilter, ReservationWhereInput>
  }

  export type ReservationChangeLogOrderByWithRelationInput = {
    id?: SortOrder
    reservationId?: SortOrder
    field?: SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    changedBy?: SortOrder
    changedAt?: SortOrder
    reservation?: ReservationOrderByWithRelationInput
  }

  export type ReservationChangeLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReservationChangeLogWhereInput | ReservationChangeLogWhereInput[]
    OR?: ReservationChangeLogWhereInput[]
    NOT?: ReservationChangeLogWhereInput | ReservationChangeLogWhereInput[]
    reservationId?: StringFilter<"ReservationChangeLog"> | string
    field?: StringFilter<"ReservationChangeLog"> | string
    oldValue?: StringNullableFilter<"ReservationChangeLog"> | string | null
    newValue?: StringNullableFilter<"ReservationChangeLog"> | string | null
    changedBy?: StringFilter<"ReservationChangeLog"> | string
    changedAt?: DateTimeFilter<"ReservationChangeLog"> | Date | string
    reservation?: XOR<ReservationRelationFilter, ReservationWhereInput>
  }, "id">

  export type ReservationChangeLogOrderByWithAggregationInput = {
    id?: SortOrder
    reservationId?: SortOrder
    field?: SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    changedBy?: SortOrder
    changedAt?: SortOrder
    _count?: ReservationChangeLogCountOrderByAggregateInput
    _max?: ReservationChangeLogMaxOrderByAggregateInput
    _min?: ReservationChangeLogMinOrderByAggregateInput
  }

  export type ReservationChangeLogScalarWhereWithAggregatesInput = {
    AND?: ReservationChangeLogScalarWhereWithAggregatesInput | ReservationChangeLogScalarWhereWithAggregatesInput[]
    OR?: ReservationChangeLogScalarWhereWithAggregatesInput[]
    NOT?: ReservationChangeLogScalarWhereWithAggregatesInput | ReservationChangeLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReservationChangeLog"> | string
    reservationId?: StringWithAggregatesFilter<"ReservationChangeLog"> | string
    field?: StringWithAggregatesFilter<"ReservationChangeLog"> | string
    oldValue?: StringNullableWithAggregatesFilter<"ReservationChangeLog"> | string | null
    newValue?: StringNullableWithAggregatesFilter<"ReservationChangeLog"> | string | null
    changedBy?: StringWithAggregatesFilter<"ReservationChangeLog"> | string
    changedAt?: DateTimeWithAggregatesFilter<"ReservationChangeLog"> | Date | string
  }

  export type RoomStatusHistoryWhereInput = {
    AND?: RoomStatusHistoryWhereInput | RoomStatusHistoryWhereInput[]
    OR?: RoomStatusHistoryWhereInput[]
    NOT?: RoomStatusHistoryWhereInput | RoomStatusHistoryWhereInput[]
    id?: StringFilter<"RoomStatusHistory"> | string
    roomId?: StringFilter<"RoomStatusHistory"> | string
    fromStatus?: StringNullableFilter<"RoomStatusHistory"> | string | null
    toStatus?: StringFilter<"RoomStatusHistory"> | string
    changedBy?: StringFilter<"RoomStatusHistory"> | string
    note?: StringNullableFilter<"RoomStatusHistory"> | string | null
    changedAt?: DateTimeFilter<"RoomStatusHistory"> | Date | string
    room?: XOR<RoomRelationFilter, RoomWhereInput>
  }

  export type RoomStatusHistoryOrderByWithRelationInput = {
    id?: SortOrder
    roomId?: SortOrder
    fromStatus?: SortOrderInput | SortOrder
    toStatus?: SortOrder
    changedBy?: SortOrder
    note?: SortOrderInput | SortOrder
    changedAt?: SortOrder
    room?: RoomOrderByWithRelationInput
  }

  export type RoomStatusHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoomStatusHistoryWhereInput | RoomStatusHistoryWhereInput[]
    OR?: RoomStatusHistoryWhereInput[]
    NOT?: RoomStatusHistoryWhereInput | RoomStatusHistoryWhereInput[]
    roomId?: StringFilter<"RoomStatusHistory"> | string
    fromStatus?: StringNullableFilter<"RoomStatusHistory"> | string | null
    toStatus?: StringFilter<"RoomStatusHistory"> | string
    changedBy?: StringFilter<"RoomStatusHistory"> | string
    note?: StringNullableFilter<"RoomStatusHistory"> | string | null
    changedAt?: DateTimeFilter<"RoomStatusHistory"> | Date | string
    room?: XOR<RoomRelationFilter, RoomWhereInput>
  }, "id">

  export type RoomStatusHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    roomId?: SortOrder
    fromStatus?: SortOrderInput | SortOrder
    toStatus?: SortOrder
    changedBy?: SortOrder
    note?: SortOrderInput | SortOrder
    changedAt?: SortOrder
    _count?: RoomStatusHistoryCountOrderByAggregateInput
    _max?: RoomStatusHistoryMaxOrderByAggregateInput
    _min?: RoomStatusHistoryMinOrderByAggregateInput
  }

  export type RoomStatusHistoryScalarWhereWithAggregatesInput = {
    AND?: RoomStatusHistoryScalarWhereWithAggregatesInput | RoomStatusHistoryScalarWhereWithAggregatesInput[]
    OR?: RoomStatusHistoryScalarWhereWithAggregatesInput[]
    NOT?: RoomStatusHistoryScalarWhereWithAggregatesInput | RoomStatusHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoomStatusHistory"> | string
    roomId?: StringWithAggregatesFilter<"RoomStatusHistory"> | string
    fromStatus?: StringNullableWithAggregatesFilter<"RoomStatusHistory"> | string | null
    toStatus?: StringWithAggregatesFilter<"RoomStatusHistory"> | string
    changedBy?: StringWithAggregatesFilter<"RoomStatusHistory"> | string
    note?: StringNullableWithAggregatesFilter<"RoomStatusHistory"> | string | null
    changedAt?: DateTimeWithAggregatesFilter<"RoomStatusHistory"> | Date | string
  }

  export type RoomTypeCreateInput = {
    id?: string
    name: string
    description?: string | null
    basePrice: number
    maxGuests: number
    bedType?: string | null
    amenities?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    rooms?: RoomCreateNestedManyWithoutRoomTypeInput
    reservations?: ReservationCreateNestedManyWithoutRoomTypeInput
    photos?: RoomTypePhotoCreateNestedManyWithoutRoomTypeInput
  }

  export type RoomTypeUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    basePrice: number
    maxGuests: number
    bedType?: string | null
    amenities?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    rooms?: RoomUncheckedCreateNestedManyWithoutRoomTypeInput
    reservations?: ReservationUncheckedCreateNestedManyWithoutRoomTypeInput
    photos?: RoomTypePhotoUncheckedCreateNestedManyWithoutRoomTypeInput
  }

  export type RoomTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: IntFieldUpdateOperationsInput | number
    maxGuests?: IntFieldUpdateOperationsInput | number
    bedType?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    rooms?: RoomUpdateManyWithoutRoomTypeNestedInput
    reservations?: ReservationUpdateManyWithoutRoomTypeNestedInput
    photos?: RoomTypePhotoUpdateManyWithoutRoomTypeNestedInput
  }

  export type RoomTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: IntFieldUpdateOperationsInput | number
    maxGuests?: IntFieldUpdateOperationsInput | number
    bedType?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    rooms?: RoomUncheckedUpdateManyWithoutRoomTypeNestedInput
    reservations?: ReservationUncheckedUpdateManyWithoutRoomTypeNestedInput
    photos?: RoomTypePhotoUncheckedUpdateManyWithoutRoomTypeNestedInput
  }

  export type RoomTypeCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    basePrice: number
    maxGuests: number
    bedType?: string | null
    amenities?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
  }

  export type RoomTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: IntFieldUpdateOperationsInput | number
    maxGuests?: IntFieldUpdateOperationsInput | number
    bedType?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RoomTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: IntFieldUpdateOperationsInput | number
    maxGuests?: IntFieldUpdateOperationsInput | number
    bedType?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RoomTypePhotoCreateInput = {
    id?: string
    filename: string
    url: string
    uploadedAt?: Date | string
    roomType: RoomTypeCreateNestedOneWithoutPhotosInput
  }

  export type RoomTypePhotoUncheckedCreateInput = {
    id?: string
    roomTypeId: string
    filename: string
    url: string
    uploadedAt?: Date | string
  }

  export type RoomTypePhotoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomType?: RoomTypeUpdateOneRequiredWithoutPhotosNestedInput
  }

  export type RoomTypePhotoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomTypeId?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomTypePhotoCreateManyInput = {
    id?: string
    roomTypeId: string
    filename: string
    url: string
    uploadedAt?: Date | string
  }

  export type RoomTypePhotoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomTypePhotoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomTypeId?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomCreateInput = {
    id?: string
    roomNumber: string
    floor?: number | null
    status?: $Enums.RoomStatus
    isActive?: boolean
    roomType: RoomTypeCreateNestedOneWithoutRoomsInput
    reservations?: ReservationCreateNestedManyWithoutRoomInput
    history?: RoomStatusHistoryCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateInput = {
    id?: string
    roomTypeId: string
    roomNumber: string
    floor?: number | null
    status?: $Enums.RoomStatus
    isActive?: boolean
    reservations?: ReservationUncheckedCreateNestedManyWithoutRoomInput
    history?: RoomStatusHistoryUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    roomType?: RoomTypeUpdateOneRequiredWithoutRoomsNestedInput
    reservations?: ReservationUpdateManyWithoutRoomNestedInput
    history?: RoomStatusHistoryUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomTypeId?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    reservations?: ReservationUncheckedUpdateManyWithoutRoomNestedInput
    history?: RoomStatusHistoryUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomCreateManyInput = {
    id?: string
    roomTypeId: string
    roomNumber: string
    floor?: number | null
    status?: $Enums.RoomStatus
    isActive?: boolean
  }

  export type RoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomTypeId?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GuestCreateInput = {
    id?: string
    userId?: string | null
    fullName: string
    phone?: string | null
    email?: string | null
    reservations?: ReservationCreateNestedManyWithoutGuestInput
  }

  export type GuestUncheckedCreateInput = {
    id?: string
    userId?: string | null
    fullName: string
    phone?: string | null
    email?: string | null
    reservations?: ReservationUncheckedCreateNestedManyWithoutGuestInput
  }

  export type GuestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    reservations?: ReservationUpdateManyWithoutGuestNestedInput
  }

  export type GuestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    reservations?: ReservationUncheckedUpdateManyWithoutGuestNestedInput
  }

  export type GuestCreateManyInput = {
    id?: string
    userId?: string | null
    fullName: string
    phone?: string | null
    email?: string | null
  }

  export type GuestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GuestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReservationCreateInput = {
    id?: string
    idempotencyKey: string
    reference: string
    checkIn: Date | string
    checkOut: Date | string
    guestCount: number
    specialRequest?: string | null
    status?: $Enums.ReservationStatus
    source?: $Enums.ReservationSource
    rateSnapshot: number
    taxRateBp: number
    totalAmount: number
    holdExpiresAt?: Date | string | null
    createdBy: string
    createdAt?: Date | string
    guest: GuestCreateNestedOneWithoutReservationsInput
    roomType: RoomTypeCreateNestedOneWithoutReservationsInput
    room?: RoomCreateNestedOneWithoutReservationsInput
    history?: ReservationStatusHistoryCreateNestedManyWithoutReservationInput
    changeLog?: ReservationChangeLogCreateNestedManyWithoutReservationInput
  }

  export type ReservationUncheckedCreateInput = {
    id?: string
    idempotencyKey: string
    reference: string
    guestId: string
    roomTypeId: string
    roomId?: string | null
    checkIn: Date | string
    checkOut: Date | string
    guestCount: number
    specialRequest?: string | null
    status?: $Enums.ReservationStatus
    source?: $Enums.ReservationSource
    rateSnapshot: number
    taxRateBp: number
    totalAmount: number
    holdExpiresAt?: Date | string | null
    createdBy: string
    createdAt?: Date | string
    history?: ReservationStatusHistoryUncheckedCreateNestedManyWithoutReservationInput
    changeLog?: ReservationChangeLogUncheckedCreateNestedManyWithoutReservationInput
  }

  export type ReservationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    specialRequest?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    source?: EnumReservationSourceFieldUpdateOperationsInput | $Enums.ReservationSource
    rateSnapshot?: IntFieldUpdateOperationsInput | number
    taxRateBp?: IntFieldUpdateOperationsInput | number
    totalAmount?: IntFieldUpdateOperationsInput | number
    holdExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guest?: GuestUpdateOneRequiredWithoutReservationsNestedInput
    roomType?: RoomTypeUpdateOneRequiredWithoutReservationsNestedInput
    room?: RoomUpdateOneWithoutReservationsNestedInput
    history?: ReservationStatusHistoryUpdateManyWithoutReservationNestedInput
    changeLog?: ReservationChangeLogUpdateManyWithoutReservationNestedInput
  }

  export type ReservationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    guestId?: StringFieldUpdateOperationsInput | string
    roomTypeId?: StringFieldUpdateOperationsInput | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    specialRequest?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    source?: EnumReservationSourceFieldUpdateOperationsInput | $Enums.ReservationSource
    rateSnapshot?: IntFieldUpdateOperationsInput | number
    taxRateBp?: IntFieldUpdateOperationsInput | number
    totalAmount?: IntFieldUpdateOperationsInput | number
    holdExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    history?: ReservationStatusHistoryUncheckedUpdateManyWithoutReservationNestedInput
    changeLog?: ReservationChangeLogUncheckedUpdateManyWithoutReservationNestedInput
  }

  export type ReservationCreateManyInput = {
    id?: string
    idempotencyKey: string
    reference: string
    guestId: string
    roomTypeId: string
    roomId?: string | null
    checkIn: Date | string
    checkOut: Date | string
    guestCount: number
    specialRequest?: string | null
    status?: $Enums.ReservationStatus
    source?: $Enums.ReservationSource
    rateSnapshot: number
    taxRateBp: number
    totalAmount: number
    holdExpiresAt?: Date | string | null
    createdBy: string
    createdAt?: Date | string
  }

  export type ReservationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    specialRequest?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    source?: EnumReservationSourceFieldUpdateOperationsInput | $Enums.ReservationSource
    rateSnapshot?: IntFieldUpdateOperationsInput | number
    taxRateBp?: IntFieldUpdateOperationsInput | number
    totalAmount?: IntFieldUpdateOperationsInput | number
    holdExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    guestId?: StringFieldUpdateOperationsInput | string
    roomTypeId?: StringFieldUpdateOperationsInput | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    specialRequest?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    source?: EnumReservationSourceFieldUpdateOperationsInput | $Enums.ReservationSource
    rateSnapshot?: IntFieldUpdateOperationsInput | number
    taxRateBp?: IntFieldUpdateOperationsInput | number
    totalAmount?: IntFieldUpdateOperationsInput | number
    holdExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationStatusHistoryCreateInput = {
    id?: string
    fromStatus?: string | null
    toStatus: string
    changedBy: string
    reason?: string | null
    changedAt?: Date | string
    reservation: ReservationCreateNestedOneWithoutHistoryInput
  }

  export type ReservationStatusHistoryUncheckedCreateInput = {
    id?: string
    reservationId: string
    fromStatus?: string | null
    toStatus: string
    changedBy: string
    reason?: string | null
    changedAt?: Date | string
  }

  export type ReservationStatusHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableStringFieldUpdateOperationsInput | string | null
    toStatus?: StringFieldUpdateOperationsInput | string
    changedBy?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reservation?: ReservationUpdateOneRequiredWithoutHistoryNestedInput
  }

  export type ReservationStatusHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reservationId?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableStringFieldUpdateOperationsInput | string | null
    toStatus?: StringFieldUpdateOperationsInput | string
    changedBy?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationStatusHistoryCreateManyInput = {
    id?: string
    reservationId: string
    fromStatus?: string | null
    toStatus: string
    changedBy: string
    reason?: string | null
    changedAt?: Date | string
  }

  export type ReservationStatusHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableStringFieldUpdateOperationsInput | string | null
    toStatus?: StringFieldUpdateOperationsInput | string
    changedBy?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationStatusHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reservationId?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableStringFieldUpdateOperationsInput | string | null
    toStatus?: StringFieldUpdateOperationsInput | string
    changedBy?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationChangeLogCreateInput = {
    id?: string
    field: string
    oldValue?: string | null
    newValue?: string | null
    changedBy: string
    changedAt?: Date | string
    reservation: ReservationCreateNestedOneWithoutChangeLogInput
  }

  export type ReservationChangeLogUncheckedCreateInput = {
    id?: string
    reservationId: string
    field: string
    oldValue?: string | null
    newValue?: string | null
    changedBy: string
    changedAt?: Date | string
  }

  export type ReservationChangeLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    changedBy?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reservation?: ReservationUpdateOneRequiredWithoutChangeLogNestedInput
  }

  export type ReservationChangeLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reservationId?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    changedBy?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationChangeLogCreateManyInput = {
    id?: string
    reservationId: string
    field: string
    oldValue?: string | null
    newValue?: string | null
    changedBy: string
    changedAt?: Date | string
  }

  export type ReservationChangeLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    changedBy?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationChangeLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reservationId?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    changedBy?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStatusHistoryCreateInput = {
    id?: string
    fromStatus?: string | null
    toStatus: string
    changedBy: string
    note?: string | null
    changedAt?: Date | string
    room: RoomCreateNestedOneWithoutHistoryInput
  }

  export type RoomStatusHistoryUncheckedCreateInput = {
    id?: string
    roomId: string
    fromStatus?: string | null
    toStatus: string
    changedBy: string
    note?: string | null
    changedAt?: Date | string
  }

  export type RoomStatusHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableStringFieldUpdateOperationsInput | string | null
    toStatus?: StringFieldUpdateOperationsInput | string
    changedBy?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutHistoryNestedInput
  }

  export type RoomStatusHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableStringFieldUpdateOperationsInput | string | null
    toStatus?: StringFieldUpdateOperationsInput | string
    changedBy?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStatusHistoryCreateManyInput = {
    id?: string
    roomId: string
    fromStatus?: string | null
    toStatus: string
    changedBy: string
    note?: string | null
    changedAt?: Date | string
  }

  export type RoomStatusHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableStringFieldUpdateOperationsInput | string | null
    toStatus?: StringFieldUpdateOperationsInput | string
    changedBy?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStatusHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableStringFieldUpdateOperationsInput | string | null
    toStatus?: StringFieldUpdateOperationsInput | string
    changedBy?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type RoomListRelationFilter = {
    every?: RoomWhereInput
    some?: RoomWhereInput
    none?: RoomWhereInput
  }

  export type ReservationListRelationFilter = {
    every?: ReservationWhereInput
    some?: ReservationWhereInput
    none?: ReservationWhereInput
  }

  export type RoomTypePhotoListRelationFilter = {
    every?: RoomTypePhotoWhereInput
    some?: RoomTypePhotoWhereInput
    none?: RoomTypePhotoWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RoomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReservationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomTypePhotoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    basePrice?: SortOrder
    maxGuests?: SortOrder
    bedType?: SortOrder
    amenities?: SortOrder
    isActive?: SortOrder
  }

  export type RoomTypeAvgOrderByAggregateInput = {
    basePrice?: SortOrder
    maxGuests?: SortOrder
  }

  export type RoomTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    basePrice?: SortOrder
    maxGuests?: SortOrder
    bedType?: SortOrder
    isActive?: SortOrder
  }

  export type RoomTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    basePrice?: SortOrder
    maxGuests?: SortOrder
    bedType?: SortOrder
    isActive?: SortOrder
  }

  export type RoomTypeSumOrderByAggregateInput = {
    basePrice?: SortOrder
    maxGuests?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RoomTypeRelationFilter = {
    is?: RoomTypeWhereInput
    isNot?: RoomTypeWhereInput
  }

  export type RoomTypePhotoCountOrderByAggregateInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    filename?: SortOrder
    url?: SortOrder
    uploadedAt?: SortOrder
  }

  export type RoomTypePhotoMaxOrderByAggregateInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    filename?: SortOrder
    url?: SortOrder
    uploadedAt?: SortOrder
  }

  export type RoomTypePhotoMinOrderByAggregateInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    filename?: SortOrder
    url?: SortOrder
    uploadedAt?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumRoomStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomStatus | EnumRoomStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RoomStatus[] | ListEnumRoomStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomStatus[] | ListEnumRoomStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomStatusFilter<$PrismaModel> | $Enums.RoomStatus
  }

  export type RoomStatusHistoryListRelationFilter = {
    every?: RoomStatusHistoryWhereInput
    some?: RoomStatusHistoryWhereInput
    none?: RoomStatusHistoryWhereInput
  }

  export type RoomStatusHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomCountOrderByAggregateInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    roomNumber?: SortOrder
    floor?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
  }

  export type RoomAvgOrderByAggregateInput = {
    floor?: SortOrder
  }

  export type RoomMaxOrderByAggregateInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    roomNumber?: SortOrder
    floor?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
  }

  export type RoomMinOrderByAggregateInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    roomNumber?: SortOrder
    floor?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
  }

  export type RoomSumOrderByAggregateInput = {
    floor?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumRoomStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomStatus | EnumRoomStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RoomStatus[] | ListEnumRoomStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomStatus[] | ListEnumRoomStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomStatusWithAggregatesFilter<$PrismaModel> | $Enums.RoomStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoomStatusFilter<$PrismaModel>
    _max?: NestedEnumRoomStatusFilter<$PrismaModel>
  }

  export type GuestCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
  }

  export type GuestMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
  }

  export type GuestMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
  }

  export type EnumReservationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReservationStatus | EnumReservationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReservationStatusFilter<$PrismaModel> | $Enums.ReservationStatus
  }

  export type EnumReservationSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.ReservationSource | EnumReservationSourceFieldRefInput<$PrismaModel>
    in?: $Enums.ReservationSource[] | ListEnumReservationSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReservationSource[] | ListEnumReservationSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumReservationSourceFilter<$PrismaModel> | $Enums.ReservationSource
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type GuestRelationFilter = {
    is?: GuestWhereInput
    isNot?: GuestWhereInput
  }

  export type RoomNullableRelationFilter = {
    is?: RoomWhereInput | null
    isNot?: RoomWhereInput | null
  }

  export type ReservationStatusHistoryListRelationFilter = {
    every?: ReservationStatusHistoryWhereInput
    some?: ReservationStatusHistoryWhereInput
    none?: ReservationStatusHistoryWhereInput
  }

  export type ReservationChangeLogListRelationFilter = {
    every?: ReservationChangeLogWhereInput
    some?: ReservationChangeLogWhereInput
    none?: ReservationChangeLogWhereInput
  }

  export type ReservationStatusHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReservationChangeLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReservationCountOrderByAggregateInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    reference?: SortOrder
    guestId?: SortOrder
    roomTypeId?: SortOrder
    roomId?: SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    guestCount?: SortOrder
    specialRequest?: SortOrder
    status?: SortOrder
    source?: SortOrder
    rateSnapshot?: SortOrder
    taxRateBp?: SortOrder
    totalAmount?: SortOrder
    holdExpiresAt?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type ReservationAvgOrderByAggregateInput = {
    guestCount?: SortOrder
    rateSnapshot?: SortOrder
    taxRateBp?: SortOrder
    totalAmount?: SortOrder
  }

  export type ReservationMaxOrderByAggregateInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    reference?: SortOrder
    guestId?: SortOrder
    roomTypeId?: SortOrder
    roomId?: SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    guestCount?: SortOrder
    specialRequest?: SortOrder
    status?: SortOrder
    source?: SortOrder
    rateSnapshot?: SortOrder
    taxRateBp?: SortOrder
    totalAmount?: SortOrder
    holdExpiresAt?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type ReservationMinOrderByAggregateInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    reference?: SortOrder
    guestId?: SortOrder
    roomTypeId?: SortOrder
    roomId?: SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    guestCount?: SortOrder
    specialRequest?: SortOrder
    status?: SortOrder
    source?: SortOrder
    rateSnapshot?: SortOrder
    taxRateBp?: SortOrder
    totalAmount?: SortOrder
    holdExpiresAt?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type ReservationSumOrderByAggregateInput = {
    guestCount?: SortOrder
    rateSnapshot?: SortOrder
    taxRateBp?: SortOrder
    totalAmount?: SortOrder
  }

  export type EnumReservationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReservationStatus | EnumReservationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReservationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReservationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReservationStatusFilter<$PrismaModel>
    _max?: NestedEnumReservationStatusFilter<$PrismaModel>
  }

  export type EnumReservationSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReservationSource | EnumReservationSourceFieldRefInput<$PrismaModel>
    in?: $Enums.ReservationSource[] | ListEnumReservationSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReservationSource[] | ListEnumReservationSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumReservationSourceWithAggregatesFilter<$PrismaModel> | $Enums.ReservationSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReservationSourceFilter<$PrismaModel>
    _max?: NestedEnumReservationSourceFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ReservationRelationFilter = {
    is?: ReservationWhereInput
    isNot?: ReservationWhereInput
  }

  export type ReservationStatusHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    reservationId?: SortOrder
    fromStatus?: SortOrder
    toStatus?: SortOrder
    changedBy?: SortOrder
    reason?: SortOrder
    changedAt?: SortOrder
  }

  export type ReservationStatusHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    reservationId?: SortOrder
    fromStatus?: SortOrder
    toStatus?: SortOrder
    changedBy?: SortOrder
    reason?: SortOrder
    changedAt?: SortOrder
  }

  export type ReservationStatusHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    reservationId?: SortOrder
    fromStatus?: SortOrder
    toStatus?: SortOrder
    changedBy?: SortOrder
    reason?: SortOrder
    changedAt?: SortOrder
  }

  export type ReservationChangeLogCountOrderByAggregateInput = {
    id?: SortOrder
    reservationId?: SortOrder
    field?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    changedBy?: SortOrder
    changedAt?: SortOrder
  }

  export type ReservationChangeLogMaxOrderByAggregateInput = {
    id?: SortOrder
    reservationId?: SortOrder
    field?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    changedBy?: SortOrder
    changedAt?: SortOrder
  }

  export type ReservationChangeLogMinOrderByAggregateInput = {
    id?: SortOrder
    reservationId?: SortOrder
    field?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    changedBy?: SortOrder
    changedAt?: SortOrder
  }

  export type RoomRelationFilter = {
    is?: RoomWhereInput
    isNot?: RoomWhereInput
  }

  export type RoomStatusHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    fromStatus?: SortOrder
    toStatus?: SortOrder
    changedBy?: SortOrder
    note?: SortOrder
    changedAt?: SortOrder
  }

  export type RoomStatusHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    fromStatus?: SortOrder
    toStatus?: SortOrder
    changedBy?: SortOrder
    note?: SortOrder
    changedAt?: SortOrder
  }

  export type RoomStatusHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    fromStatus?: SortOrder
    toStatus?: SortOrder
    changedBy?: SortOrder
    note?: SortOrder
    changedAt?: SortOrder
  }

  export type RoomCreateNestedManyWithoutRoomTypeInput = {
    create?: XOR<RoomCreateWithoutRoomTypeInput, RoomUncheckedCreateWithoutRoomTypeInput> | RoomCreateWithoutRoomTypeInput[] | RoomUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutRoomTypeInput | RoomCreateOrConnectWithoutRoomTypeInput[]
    createMany?: RoomCreateManyRoomTypeInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type ReservationCreateNestedManyWithoutRoomTypeInput = {
    create?: XOR<ReservationCreateWithoutRoomTypeInput, ReservationUncheckedCreateWithoutRoomTypeInput> | ReservationCreateWithoutRoomTypeInput[] | ReservationUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutRoomTypeInput | ReservationCreateOrConnectWithoutRoomTypeInput[]
    createMany?: ReservationCreateManyRoomTypeInputEnvelope
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
  }

  export type RoomTypePhotoCreateNestedManyWithoutRoomTypeInput = {
    create?: XOR<RoomTypePhotoCreateWithoutRoomTypeInput, RoomTypePhotoUncheckedCreateWithoutRoomTypeInput> | RoomTypePhotoCreateWithoutRoomTypeInput[] | RoomTypePhotoUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: RoomTypePhotoCreateOrConnectWithoutRoomTypeInput | RoomTypePhotoCreateOrConnectWithoutRoomTypeInput[]
    createMany?: RoomTypePhotoCreateManyRoomTypeInputEnvelope
    connect?: RoomTypePhotoWhereUniqueInput | RoomTypePhotoWhereUniqueInput[]
  }

  export type RoomUncheckedCreateNestedManyWithoutRoomTypeInput = {
    create?: XOR<RoomCreateWithoutRoomTypeInput, RoomUncheckedCreateWithoutRoomTypeInput> | RoomCreateWithoutRoomTypeInput[] | RoomUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutRoomTypeInput | RoomCreateOrConnectWithoutRoomTypeInput[]
    createMany?: RoomCreateManyRoomTypeInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type ReservationUncheckedCreateNestedManyWithoutRoomTypeInput = {
    create?: XOR<ReservationCreateWithoutRoomTypeInput, ReservationUncheckedCreateWithoutRoomTypeInput> | ReservationCreateWithoutRoomTypeInput[] | ReservationUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutRoomTypeInput | ReservationCreateOrConnectWithoutRoomTypeInput[]
    createMany?: ReservationCreateManyRoomTypeInputEnvelope
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
  }

  export type RoomTypePhotoUncheckedCreateNestedManyWithoutRoomTypeInput = {
    create?: XOR<RoomTypePhotoCreateWithoutRoomTypeInput, RoomTypePhotoUncheckedCreateWithoutRoomTypeInput> | RoomTypePhotoCreateWithoutRoomTypeInput[] | RoomTypePhotoUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: RoomTypePhotoCreateOrConnectWithoutRoomTypeInput | RoomTypePhotoCreateOrConnectWithoutRoomTypeInput[]
    createMany?: RoomTypePhotoCreateManyRoomTypeInputEnvelope
    connect?: RoomTypePhotoWhereUniqueInput | RoomTypePhotoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type RoomUpdateManyWithoutRoomTypeNestedInput = {
    create?: XOR<RoomCreateWithoutRoomTypeInput, RoomUncheckedCreateWithoutRoomTypeInput> | RoomCreateWithoutRoomTypeInput[] | RoomUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutRoomTypeInput | RoomCreateOrConnectWithoutRoomTypeInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutRoomTypeInput | RoomUpsertWithWhereUniqueWithoutRoomTypeInput[]
    createMany?: RoomCreateManyRoomTypeInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutRoomTypeInput | RoomUpdateWithWhereUniqueWithoutRoomTypeInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutRoomTypeInput | RoomUpdateManyWithWhereWithoutRoomTypeInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type ReservationUpdateManyWithoutRoomTypeNestedInput = {
    create?: XOR<ReservationCreateWithoutRoomTypeInput, ReservationUncheckedCreateWithoutRoomTypeInput> | ReservationCreateWithoutRoomTypeInput[] | ReservationUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutRoomTypeInput | ReservationCreateOrConnectWithoutRoomTypeInput[]
    upsert?: ReservationUpsertWithWhereUniqueWithoutRoomTypeInput | ReservationUpsertWithWhereUniqueWithoutRoomTypeInput[]
    createMany?: ReservationCreateManyRoomTypeInputEnvelope
    set?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    disconnect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    delete?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    update?: ReservationUpdateWithWhereUniqueWithoutRoomTypeInput | ReservationUpdateWithWhereUniqueWithoutRoomTypeInput[]
    updateMany?: ReservationUpdateManyWithWhereWithoutRoomTypeInput | ReservationUpdateManyWithWhereWithoutRoomTypeInput[]
    deleteMany?: ReservationScalarWhereInput | ReservationScalarWhereInput[]
  }

  export type RoomTypePhotoUpdateManyWithoutRoomTypeNestedInput = {
    create?: XOR<RoomTypePhotoCreateWithoutRoomTypeInput, RoomTypePhotoUncheckedCreateWithoutRoomTypeInput> | RoomTypePhotoCreateWithoutRoomTypeInput[] | RoomTypePhotoUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: RoomTypePhotoCreateOrConnectWithoutRoomTypeInput | RoomTypePhotoCreateOrConnectWithoutRoomTypeInput[]
    upsert?: RoomTypePhotoUpsertWithWhereUniqueWithoutRoomTypeInput | RoomTypePhotoUpsertWithWhereUniqueWithoutRoomTypeInput[]
    createMany?: RoomTypePhotoCreateManyRoomTypeInputEnvelope
    set?: RoomTypePhotoWhereUniqueInput | RoomTypePhotoWhereUniqueInput[]
    disconnect?: RoomTypePhotoWhereUniqueInput | RoomTypePhotoWhereUniqueInput[]
    delete?: RoomTypePhotoWhereUniqueInput | RoomTypePhotoWhereUniqueInput[]
    connect?: RoomTypePhotoWhereUniqueInput | RoomTypePhotoWhereUniqueInput[]
    update?: RoomTypePhotoUpdateWithWhereUniqueWithoutRoomTypeInput | RoomTypePhotoUpdateWithWhereUniqueWithoutRoomTypeInput[]
    updateMany?: RoomTypePhotoUpdateManyWithWhereWithoutRoomTypeInput | RoomTypePhotoUpdateManyWithWhereWithoutRoomTypeInput[]
    deleteMany?: RoomTypePhotoScalarWhereInput | RoomTypePhotoScalarWhereInput[]
  }

  export type RoomUncheckedUpdateManyWithoutRoomTypeNestedInput = {
    create?: XOR<RoomCreateWithoutRoomTypeInput, RoomUncheckedCreateWithoutRoomTypeInput> | RoomCreateWithoutRoomTypeInput[] | RoomUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutRoomTypeInput | RoomCreateOrConnectWithoutRoomTypeInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutRoomTypeInput | RoomUpsertWithWhereUniqueWithoutRoomTypeInput[]
    createMany?: RoomCreateManyRoomTypeInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutRoomTypeInput | RoomUpdateWithWhereUniqueWithoutRoomTypeInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutRoomTypeInput | RoomUpdateManyWithWhereWithoutRoomTypeInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type ReservationUncheckedUpdateManyWithoutRoomTypeNestedInput = {
    create?: XOR<ReservationCreateWithoutRoomTypeInput, ReservationUncheckedCreateWithoutRoomTypeInput> | ReservationCreateWithoutRoomTypeInput[] | ReservationUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutRoomTypeInput | ReservationCreateOrConnectWithoutRoomTypeInput[]
    upsert?: ReservationUpsertWithWhereUniqueWithoutRoomTypeInput | ReservationUpsertWithWhereUniqueWithoutRoomTypeInput[]
    createMany?: ReservationCreateManyRoomTypeInputEnvelope
    set?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    disconnect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    delete?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    update?: ReservationUpdateWithWhereUniqueWithoutRoomTypeInput | ReservationUpdateWithWhereUniqueWithoutRoomTypeInput[]
    updateMany?: ReservationUpdateManyWithWhereWithoutRoomTypeInput | ReservationUpdateManyWithWhereWithoutRoomTypeInput[]
    deleteMany?: ReservationScalarWhereInput | ReservationScalarWhereInput[]
  }

  export type RoomTypePhotoUncheckedUpdateManyWithoutRoomTypeNestedInput = {
    create?: XOR<RoomTypePhotoCreateWithoutRoomTypeInput, RoomTypePhotoUncheckedCreateWithoutRoomTypeInput> | RoomTypePhotoCreateWithoutRoomTypeInput[] | RoomTypePhotoUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: RoomTypePhotoCreateOrConnectWithoutRoomTypeInput | RoomTypePhotoCreateOrConnectWithoutRoomTypeInput[]
    upsert?: RoomTypePhotoUpsertWithWhereUniqueWithoutRoomTypeInput | RoomTypePhotoUpsertWithWhereUniqueWithoutRoomTypeInput[]
    createMany?: RoomTypePhotoCreateManyRoomTypeInputEnvelope
    set?: RoomTypePhotoWhereUniqueInput | RoomTypePhotoWhereUniqueInput[]
    disconnect?: RoomTypePhotoWhereUniqueInput | RoomTypePhotoWhereUniqueInput[]
    delete?: RoomTypePhotoWhereUniqueInput | RoomTypePhotoWhereUniqueInput[]
    connect?: RoomTypePhotoWhereUniqueInput | RoomTypePhotoWhereUniqueInput[]
    update?: RoomTypePhotoUpdateWithWhereUniqueWithoutRoomTypeInput | RoomTypePhotoUpdateWithWhereUniqueWithoutRoomTypeInput[]
    updateMany?: RoomTypePhotoUpdateManyWithWhereWithoutRoomTypeInput | RoomTypePhotoUpdateManyWithWhereWithoutRoomTypeInput[]
    deleteMany?: RoomTypePhotoScalarWhereInput | RoomTypePhotoScalarWhereInput[]
  }

  export type RoomTypeCreateNestedOneWithoutPhotosInput = {
    create?: XOR<RoomTypeCreateWithoutPhotosInput, RoomTypeUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: RoomTypeCreateOrConnectWithoutPhotosInput
    connect?: RoomTypeWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RoomTypeUpdateOneRequiredWithoutPhotosNestedInput = {
    create?: XOR<RoomTypeCreateWithoutPhotosInput, RoomTypeUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: RoomTypeCreateOrConnectWithoutPhotosInput
    upsert?: RoomTypeUpsertWithoutPhotosInput
    connect?: RoomTypeWhereUniqueInput
    update?: XOR<XOR<RoomTypeUpdateToOneWithWhereWithoutPhotosInput, RoomTypeUpdateWithoutPhotosInput>, RoomTypeUncheckedUpdateWithoutPhotosInput>
  }

  export type RoomTypeCreateNestedOneWithoutRoomsInput = {
    create?: XOR<RoomTypeCreateWithoutRoomsInput, RoomTypeUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: RoomTypeCreateOrConnectWithoutRoomsInput
    connect?: RoomTypeWhereUniqueInput
  }

  export type ReservationCreateNestedManyWithoutRoomInput = {
    create?: XOR<ReservationCreateWithoutRoomInput, ReservationUncheckedCreateWithoutRoomInput> | ReservationCreateWithoutRoomInput[] | ReservationUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutRoomInput | ReservationCreateOrConnectWithoutRoomInput[]
    createMany?: ReservationCreateManyRoomInputEnvelope
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
  }

  export type RoomStatusHistoryCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomStatusHistoryCreateWithoutRoomInput, RoomStatusHistoryUncheckedCreateWithoutRoomInput> | RoomStatusHistoryCreateWithoutRoomInput[] | RoomStatusHistoryUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomStatusHistoryCreateOrConnectWithoutRoomInput | RoomStatusHistoryCreateOrConnectWithoutRoomInput[]
    createMany?: RoomStatusHistoryCreateManyRoomInputEnvelope
    connect?: RoomStatusHistoryWhereUniqueInput | RoomStatusHistoryWhereUniqueInput[]
  }

  export type ReservationUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<ReservationCreateWithoutRoomInput, ReservationUncheckedCreateWithoutRoomInput> | ReservationCreateWithoutRoomInput[] | ReservationUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutRoomInput | ReservationCreateOrConnectWithoutRoomInput[]
    createMany?: ReservationCreateManyRoomInputEnvelope
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
  }

  export type RoomStatusHistoryUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomStatusHistoryCreateWithoutRoomInput, RoomStatusHistoryUncheckedCreateWithoutRoomInput> | RoomStatusHistoryCreateWithoutRoomInput[] | RoomStatusHistoryUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomStatusHistoryCreateOrConnectWithoutRoomInput | RoomStatusHistoryCreateOrConnectWithoutRoomInput[]
    createMany?: RoomStatusHistoryCreateManyRoomInputEnvelope
    connect?: RoomStatusHistoryWhereUniqueInput | RoomStatusHistoryWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumRoomStatusFieldUpdateOperationsInput = {
    set?: $Enums.RoomStatus
  }

  export type RoomTypeUpdateOneRequiredWithoutRoomsNestedInput = {
    create?: XOR<RoomTypeCreateWithoutRoomsInput, RoomTypeUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: RoomTypeCreateOrConnectWithoutRoomsInput
    upsert?: RoomTypeUpsertWithoutRoomsInput
    connect?: RoomTypeWhereUniqueInput
    update?: XOR<XOR<RoomTypeUpdateToOneWithWhereWithoutRoomsInput, RoomTypeUpdateWithoutRoomsInput>, RoomTypeUncheckedUpdateWithoutRoomsInput>
  }

  export type ReservationUpdateManyWithoutRoomNestedInput = {
    create?: XOR<ReservationCreateWithoutRoomInput, ReservationUncheckedCreateWithoutRoomInput> | ReservationCreateWithoutRoomInput[] | ReservationUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutRoomInput | ReservationCreateOrConnectWithoutRoomInput[]
    upsert?: ReservationUpsertWithWhereUniqueWithoutRoomInput | ReservationUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: ReservationCreateManyRoomInputEnvelope
    set?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    disconnect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    delete?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    update?: ReservationUpdateWithWhereUniqueWithoutRoomInput | ReservationUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: ReservationUpdateManyWithWhereWithoutRoomInput | ReservationUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: ReservationScalarWhereInput | ReservationScalarWhereInput[]
  }

  export type RoomStatusHistoryUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomStatusHistoryCreateWithoutRoomInput, RoomStatusHistoryUncheckedCreateWithoutRoomInput> | RoomStatusHistoryCreateWithoutRoomInput[] | RoomStatusHistoryUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomStatusHistoryCreateOrConnectWithoutRoomInput | RoomStatusHistoryCreateOrConnectWithoutRoomInput[]
    upsert?: RoomStatusHistoryUpsertWithWhereUniqueWithoutRoomInput | RoomStatusHistoryUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomStatusHistoryCreateManyRoomInputEnvelope
    set?: RoomStatusHistoryWhereUniqueInput | RoomStatusHistoryWhereUniqueInput[]
    disconnect?: RoomStatusHistoryWhereUniqueInput | RoomStatusHistoryWhereUniqueInput[]
    delete?: RoomStatusHistoryWhereUniqueInput | RoomStatusHistoryWhereUniqueInput[]
    connect?: RoomStatusHistoryWhereUniqueInput | RoomStatusHistoryWhereUniqueInput[]
    update?: RoomStatusHistoryUpdateWithWhereUniqueWithoutRoomInput | RoomStatusHistoryUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomStatusHistoryUpdateManyWithWhereWithoutRoomInput | RoomStatusHistoryUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomStatusHistoryScalarWhereInput | RoomStatusHistoryScalarWhereInput[]
  }

  export type ReservationUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<ReservationCreateWithoutRoomInput, ReservationUncheckedCreateWithoutRoomInput> | ReservationCreateWithoutRoomInput[] | ReservationUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutRoomInput | ReservationCreateOrConnectWithoutRoomInput[]
    upsert?: ReservationUpsertWithWhereUniqueWithoutRoomInput | ReservationUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: ReservationCreateManyRoomInputEnvelope
    set?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    disconnect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    delete?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    update?: ReservationUpdateWithWhereUniqueWithoutRoomInput | ReservationUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: ReservationUpdateManyWithWhereWithoutRoomInput | ReservationUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: ReservationScalarWhereInput | ReservationScalarWhereInput[]
  }

  export type RoomStatusHistoryUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomStatusHistoryCreateWithoutRoomInput, RoomStatusHistoryUncheckedCreateWithoutRoomInput> | RoomStatusHistoryCreateWithoutRoomInput[] | RoomStatusHistoryUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomStatusHistoryCreateOrConnectWithoutRoomInput | RoomStatusHistoryCreateOrConnectWithoutRoomInput[]
    upsert?: RoomStatusHistoryUpsertWithWhereUniqueWithoutRoomInput | RoomStatusHistoryUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomStatusHistoryCreateManyRoomInputEnvelope
    set?: RoomStatusHistoryWhereUniqueInput | RoomStatusHistoryWhereUniqueInput[]
    disconnect?: RoomStatusHistoryWhereUniqueInput | RoomStatusHistoryWhereUniqueInput[]
    delete?: RoomStatusHistoryWhereUniqueInput | RoomStatusHistoryWhereUniqueInput[]
    connect?: RoomStatusHistoryWhereUniqueInput | RoomStatusHistoryWhereUniqueInput[]
    update?: RoomStatusHistoryUpdateWithWhereUniqueWithoutRoomInput | RoomStatusHistoryUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomStatusHistoryUpdateManyWithWhereWithoutRoomInput | RoomStatusHistoryUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomStatusHistoryScalarWhereInput | RoomStatusHistoryScalarWhereInput[]
  }

  export type ReservationCreateNestedManyWithoutGuestInput = {
    create?: XOR<ReservationCreateWithoutGuestInput, ReservationUncheckedCreateWithoutGuestInput> | ReservationCreateWithoutGuestInput[] | ReservationUncheckedCreateWithoutGuestInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutGuestInput | ReservationCreateOrConnectWithoutGuestInput[]
    createMany?: ReservationCreateManyGuestInputEnvelope
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
  }

  export type ReservationUncheckedCreateNestedManyWithoutGuestInput = {
    create?: XOR<ReservationCreateWithoutGuestInput, ReservationUncheckedCreateWithoutGuestInput> | ReservationCreateWithoutGuestInput[] | ReservationUncheckedCreateWithoutGuestInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutGuestInput | ReservationCreateOrConnectWithoutGuestInput[]
    createMany?: ReservationCreateManyGuestInputEnvelope
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
  }

  export type ReservationUpdateManyWithoutGuestNestedInput = {
    create?: XOR<ReservationCreateWithoutGuestInput, ReservationUncheckedCreateWithoutGuestInput> | ReservationCreateWithoutGuestInput[] | ReservationUncheckedCreateWithoutGuestInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutGuestInput | ReservationCreateOrConnectWithoutGuestInput[]
    upsert?: ReservationUpsertWithWhereUniqueWithoutGuestInput | ReservationUpsertWithWhereUniqueWithoutGuestInput[]
    createMany?: ReservationCreateManyGuestInputEnvelope
    set?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    disconnect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    delete?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    update?: ReservationUpdateWithWhereUniqueWithoutGuestInput | ReservationUpdateWithWhereUniqueWithoutGuestInput[]
    updateMany?: ReservationUpdateManyWithWhereWithoutGuestInput | ReservationUpdateManyWithWhereWithoutGuestInput[]
    deleteMany?: ReservationScalarWhereInput | ReservationScalarWhereInput[]
  }

  export type ReservationUncheckedUpdateManyWithoutGuestNestedInput = {
    create?: XOR<ReservationCreateWithoutGuestInput, ReservationUncheckedCreateWithoutGuestInput> | ReservationCreateWithoutGuestInput[] | ReservationUncheckedCreateWithoutGuestInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutGuestInput | ReservationCreateOrConnectWithoutGuestInput[]
    upsert?: ReservationUpsertWithWhereUniqueWithoutGuestInput | ReservationUpsertWithWhereUniqueWithoutGuestInput[]
    createMany?: ReservationCreateManyGuestInputEnvelope
    set?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    disconnect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    delete?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    update?: ReservationUpdateWithWhereUniqueWithoutGuestInput | ReservationUpdateWithWhereUniqueWithoutGuestInput[]
    updateMany?: ReservationUpdateManyWithWhereWithoutGuestInput | ReservationUpdateManyWithWhereWithoutGuestInput[]
    deleteMany?: ReservationScalarWhereInput | ReservationScalarWhereInput[]
  }

  export type GuestCreateNestedOneWithoutReservationsInput = {
    create?: XOR<GuestCreateWithoutReservationsInput, GuestUncheckedCreateWithoutReservationsInput>
    connectOrCreate?: GuestCreateOrConnectWithoutReservationsInput
    connect?: GuestWhereUniqueInput
  }

  export type RoomTypeCreateNestedOneWithoutReservationsInput = {
    create?: XOR<RoomTypeCreateWithoutReservationsInput, RoomTypeUncheckedCreateWithoutReservationsInput>
    connectOrCreate?: RoomTypeCreateOrConnectWithoutReservationsInput
    connect?: RoomTypeWhereUniqueInput
  }

  export type RoomCreateNestedOneWithoutReservationsInput = {
    create?: XOR<RoomCreateWithoutReservationsInput, RoomUncheckedCreateWithoutReservationsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutReservationsInput
    connect?: RoomWhereUniqueInput
  }

  export type ReservationStatusHistoryCreateNestedManyWithoutReservationInput = {
    create?: XOR<ReservationStatusHistoryCreateWithoutReservationInput, ReservationStatusHistoryUncheckedCreateWithoutReservationInput> | ReservationStatusHistoryCreateWithoutReservationInput[] | ReservationStatusHistoryUncheckedCreateWithoutReservationInput[]
    connectOrCreate?: ReservationStatusHistoryCreateOrConnectWithoutReservationInput | ReservationStatusHistoryCreateOrConnectWithoutReservationInput[]
    createMany?: ReservationStatusHistoryCreateManyReservationInputEnvelope
    connect?: ReservationStatusHistoryWhereUniqueInput | ReservationStatusHistoryWhereUniqueInput[]
  }

  export type ReservationChangeLogCreateNestedManyWithoutReservationInput = {
    create?: XOR<ReservationChangeLogCreateWithoutReservationInput, ReservationChangeLogUncheckedCreateWithoutReservationInput> | ReservationChangeLogCreateWithoutReservationInput[] | ReservationChangeLogUncheckedCreateWithoutReservationInput[]
    connectOrCreate?: ReservationChangeLogCreateOrConnectWithoutReservationInput | ReservationChangeLogCreateOrConnectWithoutReservationInput[]
    createMany?: ReservationChangeLogCreateManyReservationInputEnvelope
    connect?: ReservationChangeLogWhereUniqueInput | ReservationChangeLogWhereUniqueInput[]
  }

  export type ReservationStatusHistoryUncheckedCreateNestedManyWithoutReservationInput = {
    create?: XOR<ReservationStatusHistoryCreateWithoutReservationInput, ReservationStatusHistoryUncheckedCreateWithoutReservationInput> | ReservationStatusHistoryCreateWithoutReservationInput[] | ReservationStatusHistoryUncheckedCreateWithoutReservationInput[]
    connectOrCreate?: ReservationStatusHistoryCreateOrConnectWithoutReservationInput | ReservationStatusHistoryCreateOrConnectWithoutReservationInput[]
    createMany?: ReservationStatusHistoryCreateManyReservationInputEnvelope
    connect?: ReservationStatusHistoryWhereUniqueInput | ReservationStatusHistoryWhereUniqueInput[]
  }

  export type ReservationChangeLogUncheckedCreateNestedManyWithoutReservationInput = {
    create?: XOR<ReservationChangeLogCreateWithoutReservationInput, ReservationChangeLogUncheckedCreateWithoutReservationInput> | ReservationChangeLogCreateWithoutReservationInput[] | ReservationChangeLogUncheckedCreateWithoutReservationInput[]
    connectOrCreate?: ReservationChangeLogCreateOrConnectWithoutReservationInput | ReservationChangeLogCreateOrConnectWithoutReservationInput[]
    createMany?: ReservationChangeLogCreateManyReservationInputEnvelope
    connect?: ReservationChangeLogWhereUniqueInput | ReservationChangeLogWhereUniqueInput[]
  }

  export type EnumReservationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReservationStatus
  }

  export type EnumReservationSourceFieldUpdateOperationsInput = {
    set?: $Enums.ReservationSource
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type GuestUpdateOneRequiredWithoutReservationsNestedInput = {
    create?: XOR<GuestCreateWithoutReservationsInput, GuestUncheckedCreateWithoutReservationsInput>
    connectOrCreate?: GuestCreateOrConnectWithoutReservationsInput
    upsert?: GuestUpsertWithoutReservationsInput
    connect?: GuestWhereUniqueInput
    update?: XOR<XOR<GuestUpdateToOneWithWhereWithoutReservationsInput, GuestUpdateWithoutReservationsInput>, GuestUncheckedUpdateWithoutReservationsInput>
  }

  export type RoomTypeUpdateOneRequiredWithoutReservationsNestedInput = {
    create?: XOR<RoomTypeCreateWithoutReservationsInput, RoomTypeUncheckedCreateWithoutReservationsInput>
    connectOrCreate?: RoomTypeCreateOrConnectWithoutReservationsInput
    upsert?: RoomTypeUpsertWithoutReservationsInput
    connect?: RoomTypeWhereUniqueInput
    update?: XOR<XOR<RoomTypeUpdateToOneWithWhereWithoutReservationsInput, RoomTypeUpdateWithoutReservationsInput>, RoomTypeUncheckedUpdateWithoutReservationsInput>
  }

  export type RoomUpdateOneWithoutReservationsNestedInput = {
    create?: XOR<RoomCreateWithoutReservationsInput, RoomUncheckedCreateWithoutReservationsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutReservationsInput
    upsert?: RoomUpsertWithoutReservationsInput
    disconnect?: RoomWhereInput | boolean
    delete?: RoomWhereInput | boolean
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutReservationsInput, RoomUpdateWithoutReservationsInput>, RoomUncheckedUpdateWithoutReservationsInput>
  }

  export type ReservationStatusHistoryUpdateManyWithoutReservationNestedInput = {
    create?: XOR<ReservationStatusHistoryCreateWithoutReservationInput, ReservationStatusHistoryUncheckedCreateWithoutReservationInput> | ReservationStatusHistoryCreateWithoutReservationInput[] | ReservationStatusHistoryUncheckedCreateWithoutReservationInput[]
    connectOrCreate?: ReservationStatusHistoryCreateOrConnectWithoutReservationInput | ReservationStatusHistoryCreateOrConnectWithoutReservationInput[]
    upsert?: ReservationStatusHistoryUpsertWithWhereUniqueWithoutReservationInput | ReservationStatusHistoryUpsertWithWhereUniqueWithoutReservationInput[]
    createMany?: ReservationStatusHistoryCreateManyReservationInputEnvelope
    set?: ReservationStatusHistoryWhereUniqueInput | ReservationStatusHistoryWhereUniqueInput[]
    disconnect?: ReservationStatusHistoryWhereUniqueInput | ReservationStatusHistoryWhereUniqueInput[]
    delete?: ReservationStatusHistoryWhereUniqueInput | ReservationStatusHistoryWhereUniqueInput[]
    connect?: ReservationStatusHistoryWhereUniqueInput | ReservationStatusHistoryWhereUniqueInput[]
    update?: ReservationStatusHistoryUpdateWithWhereUniqueWithoutReservationInput | ReservationStatusHistoryUpdateWithWhereUniqueWithoutReservationInput[]
    updateMany?: ReservationStatusHistoryUpdateManyWithWhereWithoutReservationInput | ReservationStatusHistoryUpdateManyWithWhereWithoutReservationInput[]
    deleteMany?: ReservationStatusHistoryScalarWhereInput | ReservationStatusHistoryScalarWhereInput[]
  }

  export type ReservationChangeLogUpdateManyWithoutReservationNestedInput = {
    create?: XOR<ReservationChangeLogCreateWithoutReservationInput, ReservationChangeLogUncheckedCreateWithoutReservationInput> | ReservationChangeLogCreateWithoutReservationInput[] | ReservationChangeLogUncheckedCreateWithoutReservationInput[]
    connectOrCreate?: ReservationChangeLogCreateOrConnectWithoutReservationInput | ReservationChangeLogCreateOrConnectWithoutReservationInput[]
    upsert?: ReservationChangeLogUpsertWithWhereUniqueWithoutReservationInput | ReservationChangeLogUpsertWithWhereUniqueWithoutReservationInput[]
    createMany?: ReservationChangeLogCreateManyReservationInputEnvelope
    set?: ReservationChangeLogWhereUniqueInput | ReservationChangeLogWhereUniqueInput[]
    disconnect?: ReservationChangeLogWhereUniqueInput | ReservationChangeLogWhereUniqueInput[]
    delete?: ReservationChangeLogWhereUniqueInput | ReservationChangeLogWhereUniqueInput[]
    connect?: ReservationChangeLogWhereUniqueInput | ReservationChangeLogWhereUniqueInput[]
    update?: ReservationChangeLogUpdateWithWhereUniqueWithoutReservationInput | ReservationChangeLogUpdateWithWhereUniqueWithoutReservationInput[]
    updateMany?: ReservationChangeLogUpdateManyWithWhereWithoutReservationInput | ReservationChangeLogUpdateManyWithWhereWithoutReservationInput[]
    deleteMany?: ReservationChangeLogScalarWhereInput | ReservationChangeLogScalarWhereInput[]
  }

  export type ReservationStatusHistoryUncheckedUpdateManyWithoutReservationNestedInput = {
    create?: XOR<ReservationStatusHistoryCreateWithoutReservationInput, ReservationStatusHistoryUncheckedCreateWithoutReservationInput> | ReservationStatusHistoryCreateWithoutReservationInput[] | ReservationStatusHistoryUncheckedCreateWithoutReservationInput[]
    connectOrCreate?: ReservationStatusHistoryCreateOrConnectWithoutReservationInput | ReservationStatusHistoryCreateOrConnectWithoutReservationInput[]
    upsert?: ReservationStatusHistoryUpsertWithWhereUniqueWithoutReservationInput | ReservationStatusHistoryUpsertWithWhereUniqueWithoutReservationInput[]
    createMany?: ReservationStatusHistoryCreateManyReservationInputEnvelope
    set?: ReservationStatusHistoryWhereUniqueInput | ReservationStatusHistoryWhereUniqueInput[]
    disconnect?: ReservationStatusHistoryWhereUniqueInput | ReservationStatusHistoryWhereUniqueInput[]
    delete?: ReservationStatusHistoryWhereUniqueInput | ReservationStatusHistoryWhereUniqueInput[]
    connect?: ReservationStatusHistoryWhereUniqueInput | ReservationStatusHistoryWhereUniqueInput[]
    update?: ReservationStatusHistoryUpdateWithWhereUniqueWithoutReservationInput | ReservationStatusHistoryUpdateWithWhereUniqueWithoutReservationInput[]
    updateMany?: ReservationStatusHistoryUpdateManyWithWhereWithoutReservationInput | ReservationStatusHistoryUpdateManyWithWhereWithoutReservationInput[]
    deleteMany?: ReservationStatusHistoryScalarWhereInput | ReservationStatusHistoryScalarWhereInput[]
  }

  export type ReservationChangeLogUncheckedUpdateManyWithoutReservationNestedInput = {
    create?: XOR<ReservationChangeLogCreateWithoutReservationInput, ReservationChangeLogUncheckedCreateWithoutReservationInput> | ReservationChangeLogCreateWithoutReservationInput[] | ReservationChangeLogUncheckedCreateWithoutReservationInput[]
    connectOrCreate?: ReservationChangeLogCreateOrConnectWithoutReservationInput | ReservationChangeLogCreateOrConnectWithoutReservationInput[]
    upsert?: ReservationChangeLogUpsertWithWhereUniqueWithoutReservationInput | ReservationChangeLogUpsertWithWhereUniqueWithoutReservationInput[]
    createMany?: ReservationChangeLogCreateManyReservationInputEnvelope
    set?: ReservationChangeLogWhereUniqueInput | ReservationChangeLogWhereUniqueInput[]
    disconnect?: ReservationChangeLogWhereUniqueInput | ReservationChangeLogWhereUniqueInput[]
    delete?: ReservationChangeLogWhereUniqueInput | ReservationChangeLogWhereUniqueInput[]
    connect?: ReservationChangeLogWhereUniqueInput | ReservationChangeLogWhereUniqueInput[]
    update?: ReservationChangeLogUpdateWithWhereUniqueWithoutReservationInput | ReservationChangeLogUpdateWithWhereUniqueWithoutReservationInput[]
    updateMany?: ReservationChangeLogUpdateManyWithWhereWithoutReservationInput | ReservationChangeLogUpdateManyWithWhereWithoutReservationInput[]
    deleteMany?: ReservationChangeLogScalarWhereInput | ReservationChangeLogScalarWhereInput[]
  }

  export type ReservationCreateNestedOneWithoutHistoryInput = {
    create?: XOR<ReservationCreateWithoutHistoryInput, ReservationUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: ReservationCreateOrConnectWithoutHistoryInput
    connect?: ReservationWhereUniqueInput
  }

  export type ReservationUpdateOneRequiredWithoutHistoryNestedInput = {
    create?: XOR<ReservationCreateWithoutHistoryInput, ReservationUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: ReservationCreateOrConnectWithoutHistoryInput
    upsert?: ReservationUpsertWithoutHistoryInput
    connect?: ReservationWhereUniqueInput
    update?: XOR<XOR<ReservationUpdateToOneWithWhereWithoutHistoryInput, ReservationUpdateWithoutHistoryInput>, ReservationUncheckedUpdateWithoutHistoryInput>
  }

  export type ReservationCreateNestedOneWithoutChangeLogInput = {
    create?: XOR<ReservationCreateWithoutChangeLogInput, ReservationUncheckedCreateWithoutChangeLogInput>
    connectOrCreate?: ReservationCreateOrConnectWithoutChangeLogInput
    connect?: ReservationWhereUniqueInput
  }

  export type ReservationUpdateOneRequiredWithoutChangeLogNestedInput = {
    create?: XOR<ReservationCreateWithoutChangeLogInput, ReservationUncheckedCreateWithoutChangeLogInput>
    connectOrCreate?: ReservationCreateOrConnectWithoutChangeLogInput
    upsert?: ReservationUpsertWithoutChangeLogInput
    connect?: ReservationWhereUniqueInput
    update?: XOR<XOR<ReservationUpdateToOneWithWhereWithoutChangeLogInput, ReservationUpdateWithoutChangeLogInput>, ReservationUncheckedUpdateWithoutChangeLogInput>
  }

  export type RoomCreateNestedOneWithoutHistoryInput = {
    create?: XOR<RoomCreateWithoutHistoryInput, RoomUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: RoomCreateOrConnectWithoutHistoryInput
    connect?: RoomWhereUniqueInput
  }

  export type RoomUpdateOneRequiredWithoutHistoryNestedInput = {
    create?: XOR<RoomCreateWithoutHistoryInput, RoomUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: RoomCreateOrConnectWithoutHistoryInput
    upsert?: RoomUpsertWithoutHistoryInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutHistoryInput, RoomUpdateWithoutHistoryInput>, RoomUncheckedUpdateWithoutHistoryInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumRoomStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomStatus | EnumRoomStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RoomStatus[] | ListEnumRoomStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomStatus[] | ListEnumRoomStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomStatusFilter<$PrismaModel> | $Enums.RoomStatus
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoomStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomStatus | EnumRoomStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RoomStatus[] | ListEnumRoomStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomStatus[] | ListEnumRoomStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomStatusWithAggregatesFilter<$PrismaModel> | $Enums.RoomStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoomStatusFilter<$PrismaModel>
    _max?: NestedEnumRoomStatusFilter<$PrismaModel>
  }

  export type NestedEnumReservationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReservationStatus | EnumReservationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReservationStatusFilter<$PrismaModel> | $Enums.ReservationStatus
  }

  export type NestedEnumReservationSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.ReservationSource | EnumReservationSourceFieldRefInput<$PrismaModel>
    in?: $Enums.ReservationSource[] | ListEnumReservationSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReservationSource[] | ListEnumReservationSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumReservationSourceFilter<$PrismaModel> | $Enums.ReservationSource
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumReservationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReservationStatus | EnumReservationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReservationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReservationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReservationStatusFilter<$PrismaModel>
    _max?: NestedEnumReservationStatusFilter<$PrismaModel>
  }

  export type NestedEnumReservationSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReservationSource | EnumReservationSourceFieldRefInput<$PrismaModel>
    in?: $Enums.ReservationSource[] | ListEnumReservationSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReservationSource[] | ListEnumReservationSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumReservationSourceWithAggregatesFilter<$PrismaModel> | $Enums.ReservationSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReservationSourceFilter<$PrismaModel>
    _max?: NestedEnumReservationSourceFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type RoomCreateWithoutRoomTypeInput = {
    id?: string
    roomNumber: string
    floor?: number | null
    status?: $Enums.RoomStatus
    isActive?: boolean
    reservations?: ReservationCreateNestedManyWithoutRoomInput
    history?: RoomStatusHistoryCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutRoomTypeInput = {
    id?: string
    roomNumber: string
    floor?: number | null
    status?: $Enums.RoomStatus
    isActive?: boolean
    reservations?: ReservationUncheckedCreateNestedManyWithoutRoomInput
    history?: RoomStatusHistoryUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutRoomTypeInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutRoomTypeInput, RoomUncheckedCreateWithoutRoomTypeInput>
  }

  export type RoomCreateManyRoomTypeInputEnvelope = {
    data: RoomCreateManyRoomTypeInput | RoomCreateManyRoomTypeInput[]
    skipDuplicates?: boolean
  }

  export type ReservationCreateWithoutRoomTypeInput = {
    id?: string
    idempotencyKey: string
    reference: string
    checkIn: Date | string
    checkOut: Date | string
    guestCount: number
    specialRequest?: string | null
    status?: $Enums.ReservationStatus
    source?: $Enums.ReservationSource
    rateSnapshot: number
    taxRateBp: number
    totalAmount: number
    holdExpiresAt?: Date | string | null
    createdBy: string
    createdAt?: Date | string
    guest: GuestCreateNestedOneWithoutReservationsInput
    room?: RoomCreateNestedOneWithoutReservationsInput
    history?: ReservationStatusHistoryCreateNestedManyWithoutReservationInput
    changeLog?: ReservationChangeLogCreateNestedManyWithoutReservationInput
  }

  export type ReservationUncheckedCreateWithoutRoomTypeInput = {
    id?: string
    idempotencyKey: string
    reference: string
    guestId: string
    roomId?: string | null
    checkIn: Date | string
    checkOut: Date | string
    guestCount: number
    specialRequest?: string | null
    status?: $Enums.ReservationStatus
    source?: $Enums.ReservationSource
    rateSnapshot: number
    taxRateBp: number
    totalAmount: number
    holdExpiresAt?: Date | string | null
    createdBy: string
    createdAt?: Date | string
    history?: ReservationStatusHistoryUncheckedCreateNestedManyWithoutReservationInput
    changeLog?: ReservationChangeLogUncheckedCreateNestedManyWithoutReservationInput
  }

  export type ReservationCreateOrConnectWithoutRoomTypeInput = {
    where: ReservationWhereUniqueInput
    create: XOR<ReservationCreateWithoutRoomTypeInput, ReservationUncheckedCreateWithoutRoomTypeInput>
  }

  export type ReservationCreateManyRoomTypeInputEnvelope = {
    data: ReservationCreateManyRoomTypeInput | ReservationCreateManyRoomTypeInput[]
    skipDuplicates?: boolean
  }

  export type RoomTypePhotoCreateWithoutRoomTypeInput = {
    id?: string
    filename: string
    url: string
    uploadedAt?: Date | string
  }

  export type RoomTypePhotoUncheckedCreateWithoutRoomTypeInput = {
    id?: string
    filename: string
    url: string
    uploadedAt?: Date | string
  }

  export type RoomTypePhotoCreateOrConnectWithoutRoomTypeInput = {
    where: RoomTypePhotoWhereUniqueInput
    create: XOR<RoomTypePhotoCreateWithoutRoomTypeInput, RoomTypePhotoUncheckedCreateWithoutRoomTypeInput>
  }

  export type RoomTypePhotoCreateManyRoomTypeInputEnvelope = {
    data: RoomTypePhotoCreateManyRoomTypeInput | RoomTypePhotoCreateManyRoomTypeInput[]
    skipDuplicates?: boolean
  }

  export type RoomUpsertWithWhereUniqueWithoutRoomTypeInput = {
    where: RoomWhereUniqueInput
    update: XOR<RoomUpdateWithoutRoomTypeInput, RoomUncheckedUpdateWithoutRoomTypeInput>
    create: XOR<RoomCreateWithoutRoomTypeInput, RoomUncheckedCreateWithoutRoomTypeInput>
  }

  export type RoomUpdateWithWhereUniqueWithoutRoomTypeInput = {
    where: RoomWhereUniqueInput
    data: XOR<RoomUpdateWithoutRoomTypeInput, RoomUncheckedUpdateWithoutRoomTypeInput>
  }

  export type RoomUpdateManyWithWhereWithoutRoomTypeInput = {
    where: RoomScalarWhereInput
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyWithoutRoomTypeInput>
  }

  export type RoomScalarWhereInput = {
    AND?: RoomScalarWhereInput | RoomScalarWhereInput[]
    OR?: RoomScalarWhereInput[]
    NOT?: RoomScalarWhereInput | RoomScalarWhereInput[]
    id?: StringFilter<"Room"> | string
    roomTypeId?: StringFilter<"Room"> | string
    roomNumber?: StringFilter<"Room"> | string
    floor?: IntNullableFilter<"Room"> | number | null
    status?: EnumRoomStatusFilter<"Room"> | $Enums.RoomStatus
    isActive?: BoolFilter<"Room"> | boolean
  }

  export type ReservationUpsertWithWhereUniqueWithoutRoomTypeInput = {
    where: ReservationWhereUniqueInput
    update: XOR<ReservationUpdateWithoutRoomTypeInput, ReservationUncheckedUpdateWithoutRoomTypeInput>
    create: XOR<ReservationCreateWithoutRoomTypeInput, ReservationUncheckedCreateWithoutRoomTypeInput>
  }

  export type ReservationUpdateWithWhereUniqueWithoutRoomTypeInput = {
    where: ReservationWhereUniqueInput
    data: XOR<ReservationUpdateWithoutRoomTypeInput, ReservationUncheckedUpdateWithoutRoomTypeInput>
  }

  export type ReservationUpdateManyWithWhereWithoutRoomTypeInput = {
    where: ReservationScalarWhereInput
    data: XOR<ReservationUpdateManyMutationInput, ReservationUncheckedUpdateManyWithoutRoomTypeInput>
  }

  export type ReservationScalarWhereInput = {
    AND?: ReservationScalarWhereInput | ReservationScalarWhereInput[]
    OR?: ReservationScalarWhereInput[]
    NOT?: ReservationScalarWhereInput | ReservationScalarWhereInput[]
    id?: StringFilter<"Reservation"> | string
    idempotencyKey?: StringFilter<"Reservation"> | string
    reference?: StringFilter<"Reservation"> | string
    guestId?: StringFilter<"Reservation"> | string
    roomTypeId?: StringFilter<"Reservation"> | string
    roomId?: StringNullableFilter<"Reservation"> | string | null
    checkIn?: DateTimeFilter<"Reservation"> | Date | string
    checkOut?: DateTimeFilter<"Reservation"> | Date | string
    guestCount?: IntFilter<"Reservation"> | number
    specialRequest?: StringNullableFilter<"Reservation"> | string | null
    status?: EnumReservationStatusFilter<"Reservation"> | $Enums.ReservationStatus
    source?: EnumReservationSourceFilter<"Reservation"> | $Enums.ReservationSource
    rateSnapshot?: IntFilter<"Reservation"> | number
    taxRateBp?: IntFilter<"Reservation"> | number
    totalAmount?: IntFilter<"Reservation"> | number
    holdExpiresAt?: DateTimeNullableFilter<"Reservation"> | Date | string | null
    createdBy?: StringFilter<"Reservation"> | string
    createdAt?: DateTimeFilter<"Reservation"> | Date | string
  }

  export type RoomTypePhotoUpsertWithWhereUniqueWithoutRoomTypeInput = {
    where: RoomTypePhotoWhereUniqueInput
    update: XOR<RoomTypePhotoUpdateWithoutRoomTypeInput, RoomTypePhotoUncheckedUpdateWithoutRoomTypeInput>
    create: XOR<RoomTypePhotoCreateWithoutRoomTypeInput, RoomTypePhotoUncheckedCreateWithoutRoomTypeInput>
  }

  export type RoomTypePhotoUpdateWithWhereUniqueWithoutRoomTypeInput = {
    where: RoomTypePhotoWhereUniqueInput
    data: XOR<RoomTypePhotoUpdateWithoutRoomTypeInput, RoomTypePhotoUncheckedUpdateWithoutRoomTypeInput>
  }

  export type RoomTypePhotoUpdateManyWithWhereWithoutRoomTypeInput = {
    where: RoomTypePhotoScalarWhereInput
    data: XOR<RoomTypePhotoUpdateManyMutationInput, RoomTypePhotoUncheckedUpdateManyWithoutRoomTypeInput>
  }

  export type RoomTypePhotoScalarWhereInput = {
    AND?: RoomTypePhotoScalarWhereInput | RoomTypePhotoScalarWhereInput[]
    OR?: RoomTypePhotoScalarWhereInput[]
    NOT?: RoomTypePhotoScalarWhereInput | RoomTypePhotoScalarWhereInput[]
    id?: StringFilter<"RoomTypePhoto"> | string
    roomTypeId?: StringFilter<"RoomTypePhoto"> | string
    filename?: StringFilter<"RoomTypePhoto"> | string
    url?: StringFilter<"RoomTypePhoto"> | string
    uploadedAt?: DateTimeFilter<"RoomTypePhoto"> | Date | string
  }

  export type RoomTypeCreateWithoutPhotosInput = {
    id?: string
    name: string
    description?: string | null
    basePrice: number
    maxGuests: number
    bedType?: string | null
    amenities?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    rooms?: RoomCreateNestedManyWithoutRoomTypeInput
    reservations?: ReservationCreateNestedManyWithoutRoomTypeInput
  }

  export type RoomTypeUncheckedCreateWithoutPhotosInput = {
    id?: string
    name: string
    description?: string | null
    basePrice: number
    maxGuests: number
    bedType?: string | null
    amenities?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    rooms?: RoomUncheckedCreateNestedManyWithoutRoomTypeInput
    reservations?: ReservationUncheckedCreateNestedManyWithoutRoomTypeInput
  }

  export type RoomTypeCreateOrConnectWithoutPhotosInput = {
    where: RoomTypeWhereUniqueInput
    create: XOR<RoomTypeCreateWithoutPhotosInput, RoomTypeUncheckedCreateWithoutPhotosInput>
  }

  export type RoomTypeUpsertWithoutPhotosInput = {
    update: XOR<RoomTypeUpdateWithoutPhotosInput, RoomTypeUncheckedUpdateWithoutPhotosInput>
    create: XOR<RoomTypeCreateWithoutPhotosInput, RoomTypeUncheckedCreateWithoutPhotosInput>
    where?: RoomTypeWhereInput
  }

  export type RoomTypeUpdateToOneWithWhereWithoutPhotosInput = {
    where?: RoomTypeWhereInput
    data: XOR<RoomTypeUpdateWithoutPhotosInput, RoomTypeUncheckedUpdateWithoutPhotosInput>
  }

  export type RoomTypeUpdateWithoutPhotosInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: IntFieldUpdateOperationsInput | number
    maxGuests?: IntFieldUpdateOperationsInput | number
    bedType?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    rooms?: RoomUpdateManyWithoutRoomTypeNestedInput
    reservations?: ReservationUpdateManyWithoutRoomTypeNestedInput
  }

  export type RoomTypeUncheckedUpdateWithoutPhotosInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: IntFieldUpdateOperationsInput | number
    maxGuests?: IntFieldUpdateOperationsInput | number
    bedType?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    rooms?: RoomUncheckedUpdateManyWithoutRoomTypeNestedInput
    reservations?: ReservationUncheckedUpdateManyWithoutRoomTypeNestedInput
  }

  export type RoomTypeCreateWithoutRoomsInput = {
    id?: string
    name: string
    description?: string | null
    basePrice: number
    maxGuests: number
    bedType?: string | null
    amenities?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    reservations?: ReservationCreateNestedManyWithoutRoomTypeInput
    photos?: RoomTypePhotoCreateNestedManyWithoutRoomTypeInput
  }

  export type RoomTypeUncheckedCreateWithoutRoomsInput = {
    id?: string
    name: string
    description?: string | null
    basePrice: number
    maxGuests: number
    bedType?: string | null
    amenities?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    reservations?: ReservationUncheckedCreateNestedManyWithoutRoomTypeInput
    photos?: RoomTypePhotoUncheckedCreateNestedManyWithoutRoomTypeInput
  }

  export type RoomTypeCreateOrConnectWithoutRoomsInput = {
    where: RoomTypeWhereUniqueInput
    create: XOR<RoomTypeCreateWithoutRoomsInput, RoomTypeUncheckedCreateWithoutRoomsInput>
  }

  export type ReservationCreateWithoutRoomInput = {
    id?: string
    idempotencyKey: string
    reference: string
    checkIn: Date | string
    checkOut: Date | string
    guestCount: number
    specialRequest?: string | null
    status?: $Enums.ReservationStatus
    source?: $Enums.ReservationSource
    rateSnapshot: number
    taxRateBp: number
    totalAmount: number
    holdExpiresAt?: Date | string | null
    createdBy: string
    createdAt?: Date | string
    guest: GuestCreateNestedOneWithoutReservationsInput
    roomType: RoomTypeCreateNestedOneWithoutReservationsInput
    history?: ReservationStatusHistoryCreateNestedManyWithoutReservationInput
    changeLog?: ReservationChangeLogCreateNestedManyWithoutReservationInput
  }

  export type ReservationUncheckedCreateWithoutRoomInput = {
    id?: string
    idempotencyKey: string
    reference: string
    guestId: string
    roomTypeId: string
    checkIn: Date | string
    checkOut: Date | string
    guestCount: number
    specialRequest?: string | null
    status?: $Enums.ReservationStatus
    source?: $Enums.ReservationSource
    rateSnapshot: number
    taxRateBp: number
    totalAmount: number
    holdExpiresAt?: Date | string | null
    createdBy: string
    createdAt?: Date | string
    history?: ReservationStatusHistoryUncheckedCreateNestedManyWithoutReservationInput
    changeLog?: ReservationChangeLogUncheckedCreateNestedManyWithoutReservationInput
  }

  export type ReservationCreateOrConnectWithoutRoomInput = {
    where: ReservationWhereUniqueInput
    create: XOR<ReservationCreateWithoutRoomInput, ReservationUncheckedCreateWithoutRoomInput>
  }

  export type ReservationCreateManyRoomInputEnvelope = {
    data: ReservationCreateManyRoomInput | ReservationCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type RoomStatusHistoryCreateWithoutRoomInput = {
    id?: string
    fromStatus?: string | null
    toStatus: string
    changedBy: string
    note?: string | null
    changedAt?: Date | string
  }

  export type RoomStatusHistoryUncheckedCreateWithoutRoomInput = {
    id?: string
    fromStatus?: string | null
    toStatus: string
    changedBy: string
    note?: string | null
    changedAt?: Date | string
  }

  export type RoomStatusHistoryCreateOrConnectWithoutRoomInput = {
    where: RoomStatusHistoryWhereUniqueInput
    create: XOR<RoomStatusHistoryCreateWithoutRoomInput, RoomStatusHistoryUncheckedCreateWithoutRoomInput>
  }

  export type RoomStatusHistoryCreateManyRoomInputEnvelope = {
    data: RoomStatusHistoryCreateManyRoomInput | RoomStatusHistoryCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type RoomTypeUpsertWithoutRoomsInput = {
    update: XOR<RoomTypeUpdateWithoutRoomsInput, RoomTypeUncheckedUpdateWithoutRoomsInput>
    create: XOR<RoomTypeCreateWithoutRoomsInput, RoomTypeUncheckedCreateWithoutRoomsInput>
    where?: RoomTypeWhereInput
  }

  export type RoomTypeUpdateToOneWithWhereWithoutRoomsInput = {
    where?: RoomTypeWhereInput
    data: XOR<RoomTypeUpdateWithoutRoomsInput, RoomTypeUncheckedUpdateWithoutRoomsInput>
  }

  export type RoomTypeUpdateWithoutRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: IntFieldUpdateOperationsInput | number
    maxGuests?: IntFieldUpdateOperationsInput | number
    bedType?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    reservations?: ReservationUpdateManyWithoutRoomTypeNestedInput
    photos?: RoomTypePhotoUpdateManyWithoutRoomTypeNestedInput
  }

  export type RoomTypeUncheckedUpdateWithoutRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: IntFieldUpdateOperationsInput | number
    maxGuests?: IntFieldUpdateOperationsInput | number
    bedType?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    reservations?: ReservationUncheckedUpdateManyWithoutRoomTypeNestedInput
    photos?: RoomTypePhotoUncheckedUpdateManyWithoutRoomTypeNestedInput
  }

  export type ReservationUpsertWithWhereUniqueWithoutRoomInput = {
    where: ReservationWhereUniqueInput
    update: XOR<ReservationUpdateWithoutRoomInput, ReservationUncheckedUpdateWithoutRoomInput>
    create: XOR<ReservationCreateWithoutRoomInput, ReservationUncheckedCreateWithoutRoomInput>
  }

  export type ReservationUpdateWithWhereUniqueWithoutRoomInput = {
    where: ReservationWhereUniqueInput
    data: XOR<ReservationUpdateWithoutRoomInput, ReservationUncheckedUpdateWithoutRoomInput>
  }

  export type ReservationUpdateManyWithWhereWithoutRoomInput = {
    where: ReservationScalarWhereInput
    data: XOR<ReservationUpdateManyMutationInput, ReservationUncheckedUpdateManyWithoutRoomInput>
  }

  export type RoomStatusHistoryUpsertWithWhereUniqueWithoutRoomInput = {
    where: RoomStatusHistoryWhereUniqueInput
    update: XOR<RoomStatusHistoryUpdateWithoutRoomInput, RoomStatusHistoryUncheckedUpdateWithoutRoomInput>
    create: XOR<RoomStatusHistoryCreateWithoutRoomInput, RoomStatusHistoryUncheckedCreateWithoutRoomInput>
  }

  export type RoomStatusHistoryUpdateWithWhereUniqueWithoutRoomInput = {
    where: RoomStatusHistoryWhereUniqueInput
    data: XOR<RoomStatusHistoryUpdateWithoutRoomInput, RoomStatusHistoryUncheckedUpdateWithoutRoomInput>
  }

  export type RoomStatusHistoryUpdateManyWithWhereWithoutRoomInput = {
    where: RoomStatusHistoryScalarWhereInput
    data: XOR<RoomStatusHistoryUpdateManyMutationInput, RoomStatusHistoryUncheckedUpdateManyWithoutRoomInput>
  }

  export type RoomStatusHistoryScalarWhereInput = {
    AND?: RoomStatusHistoryScalarWhereInput | RoomStatusHistoryScalarWhereInput[]
    OR?: RoomStatusHistoryScalarWhereInput[]
    NOT?: RoomStatusHistoryScalarWhereInput | RoomStatusHistoryScalarWhereInput[]
    id?: StringFilter<"RoomStatusHistory"> | string
    roomId?: StringFilter<"RoomStatusHistory"> | string
    fromStatus?: StringNullableFilter<"RoomStatusHistory"> | string | null
    toStatus?: StringFilter<"RoomStatusHistory"> | string
    changedBy?: StringFilter<"RoomStatusHistory"> | string
    note?: StringNullableFilter<"RoomStatusHistory"> | string | null
    changedAt?: DateTimeFilter<"RoomStatusHistory"> | Date | string
  }

  export type ReservationCreateWithoutGuestInput = {
    id?: string
    idempotencyKey: string
    reference: string
    checkIn: Date | string
    checkOut: Date | string
    guestCount: number
    specialRequest?: string | null
    status?: $Enums.ReservationStatus
    source?: $Enums.ReservationSource
    rateSnapshot: number
    taxRateBp: number
    totalAmount: number
    holdExpiresAt?: Date | string | null
    createdBy: string
    createdAt?: Date | string
    roomType: RoomTypeCreateNestedOneWithoutReservationsInput
    room?: RoomCreateNestedOneWithoutReservationsInput
    history?: ReservationStatusHistoryCreateNestedManyWithoutReservationInput
    changeLog?: ReservationChangeLogCreateNestedManyWithoutReservationInput
  }

  export type ReservationUncheckedCreateWithoutGuestInput = {
    id?: string
    idempotencyKey: string
    reference: string
    roomTypeId: string
    roomId?: string | null
    checkIn: Date | string
    checkOut: Date | string
    guestCount: number
    specialRequest?: string | null
    status?: $Enums.ReservationStatus
    source?: $Enums.ReservationSource
    rateSnapshot: number
    taxRateBp: number
    totalAmount: number
    holdExpiresAt?: Date | string | null
    createdBy: string
    createdAt?: Date | string
    history?: ReservationStatusHistoryUncheckedCreateNestedManyWithoutReservationInput
    changeLog?: ReservationChangeLogUncheckedCreateNestedManyWithoutReservationInput
  }

  export type ReservationCreateOrConnectWithoutGuestInput = {
    where: ReservationWhereUniqueInput
    create: XOR<ReservationCreateWithoutGuestInput, ReservationUncheckedCreateWithoutGuestInput>
  }

  export type ReservationCreateManyGuestInputEnvelope = {
    data: ReservationCreateManyGuestInput | ReservationCreateManyGuestInput[]
    skipDuplicates?: boolean
  }

  export type ReservationUpsertWithWhereUniqueWithoutGuestInput = {
    where: ReservationWhereUniqueInput
    update: XOR<ReservationUpdateWithoutGuestInput, ReservationUncheckedUpdateWithoutGuestInput>
    create: XOR<ReservationCreateWithoutGuestInput, ReservationUncheckedCreateWithoutGuestInput>
  }

  export type ReservationUpdateWithWhereUniqueWithoutGuestInput = {
    where: ReservationWhereUniqueInput
    data: XOR<ReservationUpdateWithoutGuestInput, ReservationUncheckedUpdateWithoutGuestInput>
  }

  export type ReservationUpdateManyWithWhereWithoutGuestInput = {
    where: ReservationScalarWhereInput
    data: XOR<ReservationUpdateManyMutationInput, ReservationUncheckedUpdateManyWithoutGuestInput>
  }

  export type GuestCreateWithoutReservationsInput = {
    id?: string
    userId?: string | null
    fullName: string
    phone?: string | null
    email?: string | null
  }

  export type GuestUncheckedCreateWithoutReservationsInput = {
    id?: string
    userId?: string | null
    fullName: string
    phone?: string | null
    email?: string | null
  }

  export type GuestCreateOrConnectWithoutReservationsInput = {
    where: GuestWhereUniqueInput
    create: XOR<GuestCreateWithoutReservationsInput, GuestUncheckedCreateWithoutReservationsInput>
  }

  export type RoomTypeCreateWithoutReservationsInput = {
    id?: string
    name: string
    description?: string | null
    basePrice: number
    maxGuests: number
    bedType?: string | null
    amenities?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    rooms?: RoomCreateNestedManyWithoutRoomTypeInput
    photos?: RoomTypePhotoCreateNestedManyWithoutRoomTypeInput
  }

  export type RoomTypeUncheckedCreateWithoutReservationsInput = {
    id?: string
    name: string
    description?: string | null
    basePrice: number
    maxGuests: number
    bedType?: string | null
    amenities?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    rooms?: RoomUncheckedCreateNestedManyWithoutRoomTypeInput
    photos?: RoomTypePhotoUncheckedCreateNestedManyWithoutRoomTypeInput
  }

  export type RoomTypeCreateOrConnectWithoutReservationsInput = {
    where: RoomTypeWhereUniqueInput
    create: XOR<RoomTypeCreateWithoutReservationsInput, RoomTypeUncheckedCreateWithoutReservationsInput>
  }

  export type RoomCreateWithoutReservationsInput = {
    id?: string
    roomNumber: string
    floor?: number | null
    status?: $Enums.RoomStatus
    isActive?: boolean
    roomType: RoomTypeCreateNestedOneWithoutRoomsInput
    history?: RoomStatusHistoryCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutReservationsInput = {
    id?: string
    roomTypeId: string
    roomNumber: string
    floor?: number | null
    status?: $Enums.RoomStatus
    isActive?: boolean
    history?: RoomStatusHistoryUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutReservationsInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutReservationsInput, RoomUncheckedCreateWithoutReservationsInput>
  }

  export type ReservationStatusHistoryCreateWithoutReservationInput = {
    id?: string
    fromStatus?: string | null
    toStatus: string
    changedBy: string
    reason?: string | null
    changedAt?: Date | string
  }

  export type ReservationStatusHistoryUncheckedCreateWithoutReservationInput = {
    id?: string
    fromStatus?: string | null
    toStatus: string
    changedBy: string
    reason?: string | null
    changedAt?: Date | string
  }

  export type ReservationStatusHistoryCreateOrConnectWithoutReservationInput = {
    where: ReservationStatusHistoryWhereUniqueInput
    create: XOR<ReservationStatusHistoryCreateWithoutReservationInput, ReservationStatusHistoryUncheckedCreateWithoutReservationInput>
  }

  export type ReservationStatusHistoryCreateManyReservationInputEnvelope = {
    data: ReservationStatusHistoryCreateManyReservationInput | ReservationStatusHistoryCreateManyReservationInput[]
    skipDuplicates?: boolean
  }

  export type ReservationChangeLogCreateWithoutReservationInput = {
    id?: string
    field: string
    oldValue?: string | null
    newValue?: string | null
    changedBy: string
    changedAt?: Date | string
  }

  export type ReservationChangeLogUncheckedCreateWithoutReservationInput = {
    id?: string
    field: string
    oldValue?: string | null
    newValue?: string | null
    changedBy: string
    changedAt?: Date | string
  }

  export type ReservationChangeLogCreateOrConnectWithoutReservationInput = {
    where: ReservationChangeLogWhereUniqueInput
    create: XOR<ReservationChangeLogCreateWithoutReservationInput, ReservationChangeLogUncheckedCreateWithoutReservationInput>
  }

  export type ReservationChangeLogCreateManyReservationInputEnvelope = {
    data: ReservationChangeLogCreateManyReservationInput | ReservationChangeLogCreateManyReservationInput[]
    skipDuplicates?: boolean
  }

  export type GuestUpsertWithoutReservationsInput = {
    update: XOR<GuestUpdateWithoutReservationsInput, GuestUncheckedUpdateWithoutReservationsInput>
    create: XOR<GuestCreateWithoutReservationsInput, GuestUncheckedCreateWithoutReservationsInput>
    where?: GuestWhereInput
  }

  export type GuestUpdateToOneWithWhereWithoutReservationsInput = {
    where?: GuestWhereInput
    data: XOR<GuestUpdateWithoutReservationsInput, GuestUncheckedUpdateWithoutReservationsInput>
  }

  export type GuestUpdateWithoutReservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GuestUncheckedUpdateWithoutReservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RoomTypeUpsertWithoutReservationsInput = {
    update: XOR<RoomTypeUpdateWithoutReservationsInput, RoomTypeUncheckedUpdateWithoutReservationsInput>
    create: XOR<RoomTypeCreateWithoutReservationsInput, RoomTypeUncheckedCreateWithoutReservationsInput>
    where?: RoomTypeWhereInput
  }

  export type RoomTypeUpdateToOneWithWhereWithoutReservationsInput = {
    where?: RoomTypeWhereInput
    data: XOR<RoomTypeUpdateWithoutReservationsInput, RoomTypeUncheckedUpdateWithoutReservationsInput>
  }

  export type RoomTypeUpdateWithoutReservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: IntFieldUpdateOperationsInput | number
    maxGuests?: IntFieldUpdateOperationsInput | number
    bedType?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    rooms?: RoomUpdateManyWithoutRoomTypeNestedInput
    photos?: RoomTypePhotoUpdateManyWithoutRoomTypeNestedInput
  }

  export type RoomTypeUncheckedUpdateWithoutReservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: IntFieldUpdateOperationsInput | number
    maxGuests?: IntFieldUpdateOperationsInput | number
    bedType?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    rooms?: RoomUncheckedUpdateManyWithoutRoomTypeNestedInput
    photos?: RoomTypePhotoUncheckedUpdateManyWithoutRoomTypeNestedInput
  }

  export type RoomUpsertWithoutReservationsInput = {
    update: XOR<RoomUpdateWithoutReservationsInput, RoomUncheckedUpdateWithoutReservationsInput>
    create: XOR<RoomCreateWithoutReservationsInput, RoomUncheckedCreateWithoutReservationsInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutReservationsInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutReservationsInput, RoomUncheckedUpdateWithoutReservationsInput>
  }

  export type RoomUpdateWithoutReservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    roomType?: RoomTypeUpdateOneRequiredWithoutRoomsNestedInput
    history?: RoomStatusHistoryUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutReservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomTypeId?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    history?: RoomStatusHistoryUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type ReservationStatusHistoryUpsertWithWhereUniqueWithoutReservationInput = {
    where: ReservationStatusHistoryWhereUniqueInput
    update: XOR<ReservationStatusHistoryUpdateWithoutReservationInput, ReservationStatusHistoryUncheckedUpdateWithoutReservationInput>
    create: XOR<ReservationStatusHistoryCreateWithoutReservationInput, ReservationStatusHistoryUncheckedCreateWithoutReservationInput>
  }

  export type ReservationStatusHistoryUpdateWithWhereUniqueWithoutReservationInput = {
    where: ReservationStatusHistoryWhereUniqueInput
    data: XOR<ReservationStatusHistoryUpdateWithoutReservationInput, ReservationStatusHistoryUncheckedUpdateWithoutReservationInput>
  }

  export type ReservationStatusHistoryUpdateManyWithWhereWithoutReservationInput = {
    where: ReservationStatusHistoryScalarWhereInput
    data: XOR<ReservationStatusHistoryUpdateManyMutationInput, ReservationStatusHistoryUncheckedUpdateManyWithoutReservationInput>
  }

  export type ReservationStatusHistoryScalarWhereInput = {
    AND?: ReservationStatusHistoryScalarWhereInput | ReservationStatusHistoryScalarWhereInput[]
    OR?: ReservationStatusHistoryScalarWhereInput[]
    NOT?: ReservationStatusHistoryScalarWhereInput | ReservationStatusHistoryScalarWhereInput[]
    id?: StringFilter<"ReservationStatusHistory"> | string
    reservationId?: StringFilter<"ReservationStatusHistory"> | string
    fromStatus?: StringNullableFilter<"ReservationStatusHistory"> | string | null
    toStatus?: StringFilter<"ReservationStatusHistory"> | string
    changedBy?: StringFilter<"ReservationStatusHistory"> | string
    reason?: StringNullableFilter<"ReservationStatusHistory"> | string | null
    changedAt?: DateTimeFilter<"ReservationStatusHistory"> | Date | string
  }

  export type ReservationChangeLogUpsertWithWhereUniqueWithoutReservationInput = {
    where: ReservationChangeLogWhereUniqueInput
    update: XOR<ReservationChangeLogUpdateWithoutReservationInput, ReservationChangeLogUncheckedUpdateWithoutReservationInput>
    create: XOR<ReservationChangeLogCreateWithoutReservationInput, ReservationChangeLogUncheckedCreateWithoutReservationInput>
  }

  export type ReservationChangeLogUpdateWithWhereUniqueWithoutReservationInput = {
    where: ReservationChangeLogWhereUniqueInput
    data: XOR<ReservationChangeLogUpdateWithoutReservationInput, ReservationChangeLogUncheckedUpdateWithoutReservationInput>
  }

  export type ReservationChangeLogUpdateManyWithWhereWithoutReservationInput = {
    where: ReservationChangeLogScalarWhereInput
    data: XOR<ReservationChangeLogUpdateManyMutationInput, ReservationChangeLogUncheckedUpdateManyWithoutReservationInput>
  }

  export type ReservationChangeLogScalarWhereInput = {
    AND?: ReservationChangeLogScalarWhereInput | ReservationChangeLogScalarWhereInput[]
    OR?: ReservationChangeLogScalarWhereInput[]
    NOT?: ReservationChangeLogScalarWhereInput | ReservationChangeLogScalarWhereInput[]
    id?: StringFilter<"ReservationChangeLog"> | string
    reservationId?: StringFilter<"ReservationChangeLog"> | string
    field?: StringFilter<"ReservationChangeLog"> | string
    oldValue?: StringNullableFilter<"ReservationChangeLog"> | string | null
    newValue?: StringNullableFilter<"ReservationChangeLog"> | string | null
    changedBy?: StringFilter<"ReservationChangeLog"> | string
    changedAt?: DateTimeFilter<"ReservationChangeLog"> | Date | string
  }

  export type ReservationCreateWithoutHistoryInput = {
    id?: string
    idempotencyKey: string
    reference: string
    checkIn: Date | string
    checkOut: Date | string
    guestCount: number
    specialRequest?: string | null
    status?: $Enums.ReservationStatus
    source?: $Enums.ReservationSource
    rateSnapshot: number
    taxRateBp: number
    totalAmount: number
    holdExpiresAt?: Date | string | null
    createdBy: string
    createdAt?: Date | string
    guest: GuestCreateNestedOneWithoutReservationsInput
    roomType: RoomTypeCreateNestedOneWithoutReservationsInput
    room?: RoomCreateNestedOneWithoutReservationsInput
    changeLog?: ReservationChangeLogCreateNestedManyWithoutReservationInput
  }

  export type ReservationUncheckedCreateWithoutHistoryInput = {
    id?: string
    idempotencyKey: string
    reference: string
    guestId: string
    roomTypeId: string
    roomId?: string | null
    checkIn: Date | string
    checkOut: Date | string
    guestCount: number
    specialRequest?: string | null
    status?: $Enums.ReservationStatus
    source?: $Enums.ReservationSource
    rateSnapshot: number
    taxRateBp: number
    totalAmount: number
    holdExpiresAt?: Date | string | null
    createdBy: string
    createdAt?: Date | string
    changeLog?: ReservationChangeLogUncheckedCreateNestedManyWithoutReservationInput
  }

  export type ReservationCreateOrConnectWithoutHistoryInput = {
    where: ReservationWhereUniqueInput
    create: XOR<ReservationCreateWithoutHistoryInput, ReservationUncheckedCreateWithoutHistoryInput>
  }

  export type ReservationUpsertWithoutHistoryInput = {
    update: XOR<ReservationUpdateWithoutHistoryInput, ReservationUncheckedUpdateWithoutHistoryInput>
    create: XOR<ReservationCreateWithoutHistoryInput, ReservationUncheckedCreateWithoutHistoryInput>
    where?: ReservationWhereInput
  }

  export type ReservationUpdateToOneWithWhereWithoutHistoryInput = {
    where?: ReservationWhereInput
    data: XOR<ReservationUpdateWithoutHistoryInput, ReservationUncheckedUpdateWithoutHistoryInput>
  }

  export type ReservationUpdateWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    specialRequest?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    source?: EnumReservationSourceFieldUpdateOperationsInput | $Enums.ReservationSource
    rateSnapshot?: IntFieldUpdateOperationsInput | number
    taxRateBp?: IntFieldUpdateOperationsInput | number
    totalAmount?: IntFieldUpdateOperationsInput | number
    holdExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guest?: GuestUpdateOneRequiredWithoutReservationsNestedInput
    roomType?: RoomTypeUpdateOneRequiredWithoutReservationsNestedInput
    room?: RoomUpdateOneWithoutReservationsNestedInput
    changeLog?: ReservationChangeLogUpdateManyWithoutReservationNestedInput
  }

  export type ReservationUncheckedUpdateWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    guestId?: StringFieldUpdateOperationsInput | string
    roomTypeId?: StringFieldUpdateOperationsInput | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    specialRequest?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    source?: EnumReservationSourceFieldUpdateOperationsInput | $Enums.ReservationSource
    rateSnapshot?: IntFieldUpdateOperationsInput | number
    taxRateBp?: IntFieldUpdateOperationsInput | number
    totalAmount?: IntFieldUpdateOperationsInput | number
    holdExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changeLog?: ReservationChangeLogUncheckedUpdateManyWithoutReservationNestedInput
  }

  export type ReservationCreateWithoutChangeLogInput = {
    id?: string
    idempotencyKey: string
    reference: string
    checkIn: Date | string
    checkOut: Date | string
    guestCount: number
    specialRequest?: string | null
    status?: $Enums.ReservationStatus
    source?: $Enums.ReservationSource
    rateSnapshot: number
    taxRateBp: number
    totalAmount: number
    holdExpiresAt?: Date | string | null
    createdBy: string
    createdAt?: Date | string
    guest: GuestCreateNestedOneWithoutReservationsInput
    roomType: RoomTypeCreateNestedOneWithoutReservationsInput
    room?: RoomCreateNestedOneWithoutReservationsInput
    history?: ReservationStatusHistoryCreateNestedManyWithoutReservationInput
  }

  export type ReservationUncheckedCreateWithoutChangeLogInput = {
    id?: string
    idempotencyKey: string
    reference: string
    guestId: string
    roomTypeId: string
    roomId?: string | null
    checkIn: Date | string
    checkOut: Date | string
    guestCount: number
    specialRequest?: string | null
    status?: $Enums.ReservationStatus
    source?: $Enums.ReservationSource
    rateSnapshot: number
    taxRateBp: number
    totalAmount: number
    holdExpiresAt?: Date | string | null
    createdBy: string
    createdAt?: Date | string
    history?: ReservationStatusHistoryUncheckedCreateNestedManyWithoutReservationInput
  }

  export type ReservationCreateOrConnectWithoutChangeLogInput = {
    where: ReservationWhereUniqueInput
    create: XOR<ReservationCreateWithoutChangeLogInput, ReservationUncheckedCreateWithoutChangeLogInput>
  }

  export type ReservationUpsertWithoutChangeLogInput = {
    update: XOR<ReservationUpdateWithoutChangeLogInput, ReservationUncheckedUpdateWithoutChangeLogInput>
    create: XOR<ReservationCreateWithoutChangeLogInput, ReservationUncheckedCreateWithoutChangeLogInput>
    where?: ReservationWhereInput
  }

  export type ReservationUpdateToOneWithWhereWithoutChangeLogInput = {
    where?: ReservationWhereInput
    data: XOR<ReservationUpdateWithoutChangeLogInput, ReservationUncheckedUpdateWithoutChangeLogInput>
  }

  export type ReservationUpdateWithoutChangeLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    specialRequest?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    source?: EnumReservationSourceFieldUpdateOperationsInput | $Enums.ReservationSource
    rateSnapshot?: IntFieldUpdateOperationsInput | number
    taxRateBp?: IntFieldUpdateOperationsInput | number
    totalAmount?: IntFieldUpdateOperationsInput | number
    holdExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guest?: GuestUpdateOneRequiredWithoutReservationsNestedInput
    roomType?: RoomTypeUpdateOneRequiredWithoutReservationsNestedInput
    room?: RoomUpdateOneWithoutReservationsNestedInput
    history?: ReservationStatusHistoryUpdateManyWithoutReservationNestedInput
  }

  export type ReservationUncheckedUpdateWithoutChangeLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    guestId?: StringFieldUpdateOperationsInput | string
    roomTypeId?: StringFieldUpdateOperationsInput | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    specialRequest?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    source?: EnumReservationSourceFieldUpdateOperationsInput | $Enums.ReservationSource
    rateSnapshot?: IntFieldUpdateOperationsInput | number
    taxRateBp?: IntFieldUpdateOperationsInput | number
    totalAmount?: IntFieldUpdateOperationsInput | number
    holdExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    history?: ReservationStatusHistoryUncheckedUpdateManyWithoutReservationNestedInput
  }

  export type RoomCreateWithoutHistoryInput = {
    id?: string
    roomNumber: string
    floor?: number | null
    status?: $Enums.RoomStatus
    isActive?: boolean
    roomType: RoomTypeCreateNestedOneWithoutRoomsInput
    reservations?: ReservationCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutHistoryInput = {
    id?: string
    roomTypeId: string
    roomNumber: string
    floor?: number | null
    status?: $Enums.RoomStatus
    isActive?: boolean
    reservations?: ReservationUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutHistoryInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutHistoryInput, RoomUncheckedCreateWithoutHistoryInput>
  }

  export type RoomUpsertWithoutHistoryInput = {
    update: XOR<RoomUpdateWithoutHistoryInput, RoomUncheckedUpdateWithoutHistoryInput>
    create: XOR<RoomCreateWithoutHistoryInput, RoomUncheckedCreateWithoutHistoryInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutHistoryInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutHistoryInput, RoomUncheckedUpdateWithoutHistoryInput>
  }

  export type RoomUpdateWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    roomType?: RoomTypeUpdateOneRequiredWithoutRoomsNestedInput
    reservations?: ReservationUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomTypeId?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    reservations?: ReservationUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomCreateManyRoomTypeInput = {
    id?: string
    roomNumber: string
    floor?: number | null
    status?: $Enums.RoomStatus
    isActive?: boolean
  }

  export type ReservationCreateManyRoomTypeInput = {
    id?: string
    idempotencyKey: string
    reference: string
    guestId: string
    roomId?: string | null
    checkIn: Date | string
    checkOut: Date | string
    guestCount: number
    specialRequest?: string | null
    status?: $Enums.ReservationStatus
    source?: $Enums.ReservationSource
    rateSnapshot: number
    taxRateBp: number
    totalAmount: number
    holdExpiresAt?: Date | string | null
    createdBy: string
    createdAt?: Date | string
  }

  export type RoomTypePhotoCreateManyRoomTypeInput = {
    id?: string
    filename: string
    url: string
    uploadedAt?: Date | string
  }

  export type RoomUpdateWithoutRoomTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    reservations?: ReservationUpdateManyWithoutRoomNestedInput
    history?: RoomStatusHistoryUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutRoomTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    reservations?: ReservationUncheckedUpdateManyWithoutRoomNestedInput
    history?: RoomStatusHistoryUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateManyWithoutRoomTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReservationUpdateWithoutRoomTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    specialRequest?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    source?: EnumReservationSourceFieldUpdateOperationsInput | $Enums.ReservationSource
    rateSnapshot?: IntFieldUpdateOperationsInput | number
    taxRateBp?: IntFieldUpdateOperationsInput | number
    totalAmount?: IntFieldUpdateOperationsInput | number
    holdExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guest?: GuestUpdateOneRequiredWithoutReservationsNestedInput
    room?: RoomUpdateOneWithoutReservationsNestedInput
    history?: ReservationStatusHistoryUpdateManyWithoutReservationNestedInput
    changeLog?: ReservationChangeLogUpdateManyWithoutReservationNestedInput
  }

  export type ReservationUncheckedUpdateWithoutRoomTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    guestId?: StringFieldUpdateOperationsInput | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    specialRequest?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    source?: EnumReservationSourceFieldUpdateOperationsInput | $Enums.ReservationSource
    rateSnapshot?: IntFieldUpdateOperationsInput | number
    taxRateBp?: IntFieldUpdateOperationsInput | number
    totalAmount?: IntFieldUpdateOperationsInput | number
    holdExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    history?: ReservationStatusHistoryUncheckedUpdateManyWithoutReservationNestedInput
    changeLog?: ReservationChangeLogUncheckedUpdateManyWithoutReservationNestedInput
  }

  export type ReservationUncheckedUpdateManyWithoutRoomTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    guestId?: StringFieldUpdateOperationsInput | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    specialRequest?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    source?: EnumReservationSourceFieldUpdateOperationsInput | $Enums.ReservationSource
    rateSnapshot?: IntFieldUpdateOperationsInput | number
    taxRateBp?: IntFieldUpdateOperationsInput | number
    totalAmount?: IntFieldUpdateOperationsInput | number
    holdExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomTypePhotoUpdateWithoutRoomTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomTypePhotoUncheckedUpdateWithoutRoomTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomTypePhotoUncheckedUpdateManyWithoutRoomTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationCreateManyRoomInput = {
    id?: string
    idempotencyKey: string
    reference: string
    guestId: string
    roomTypeId: string
    checkIn: Date | string
    checkOut: Date | string
    guestCount: number
    specialRequest?: string | null
    status?: $Enums.ReservationStatus
    source?: $Enums.ReservationSource
    rateSnapshot: number
    taxRateBp: number
    totalAmount: number
    holdExpiresAt?: Date | string | null
    createdBy: string
    createdAt?: Date | string
  }

  export type RoomStatusHistoryCreateManyRoomInput = {
    id?: string
    fromStatus?: string | null
    toStatus: string
    changedBy: string
    note?: string | null
    changedAt?: Date | string
  }

  export type ReservationUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    specialRequest?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    source?: EnumReservationSourceFieldUpdateOperationsInput | $Enums.ReservationSource
    rateSnapshot?: IntFieldUpdateOperationsInput | number
    taxRateBp?: IntFieldUpdateOperationsInput | number
    totalAmount?: IntFieldUpdateOperationsInput | number
    holdExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guest?: GuestUpdateOneRequiredWithoutReservationsNestedInput
    roomType?: RoomTypeUpdateOneRequiredWithoutReservationsNestedInput
    history?: ReservationStatusHistoryUpdateManyWithoutReservationNestedInput
    changeLog?: ReservationChangeLogUpdateManyWithoutReservationNestedInput
  }

  export type ReservationUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    guestId?: StringFieldUpdateOperationsInput | string
    roomTypeId?: StringFieldUpdateOperationsInput | string
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    specialRequest?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    source?: EnumReservationSourceFieldUpdateOperationsInput | $Enums.ReservationSource
    rateSnapshot?: IntFieldUpdateOperationsInput | number
    taxRateBp?: IntFieldUpdateOperationsInput | number
    totalAmount?: IntFieldUpdateOperationsInput | number
    holdExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    history?: ReservationStatusHistoryUncheckedUpdateManyWithoutReservationNestedInput
    changeLog?: ReservationChangeLogUncheckedUpdateManyWithoutReservationNestedInput
  }

  export type ReservationUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    guestId?: StringFieldUpdateOperationsInput | string
    roomTypeId?: StringFieldUpdateOperationsInput | string
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    specialRequest?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    source?: EnumReservationSourceFieldUpdateOperationsInput | $Enums.ReservationSource
    rateSnapshot?: IntFieldUpdateOperationsInput | number
    taxRateBp?: IntFieldUpdateOperationsInput | number
    totalAmount?: IntFieldUpdateOperationsInput | number
    holdExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStatusHistoryUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableStringFieldUpdateOperationsInput | string | null
    toStatus?: StringFieldUpdateOperationsInput | string
    changedBy?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStatusHistoryUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableStringFieldUpdateOperationsInput | string | null
    toStatus?: StringFieldUpdateOperationsInput | string
    changedBy?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStatusHistoryUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableStringFieldUpdateOperationsInput | string | null
    toStatus?: StringFieldUpdateOperationsInput | string
    changedBy?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationCreateManyGuestInput = {
    id?: string
    idempotencyKey: string
    reference: string
    roomTypeId: string
    roomId?: string | null
    checkIn: Date | string
    checkOut: Date | string
    guestCount: number
    specialRequest?: string | null
    status?: $Enums.ReservationStatus
    source?: $Enums.ReservationSource
    rateSnapshot: number
    taxRateBp: number
    totalAmount: number
    holdExpiresAt?: Date | string | null
    createdBy: string
    createdAt?: Date | string
  }

  export type ReservationUpdateWithoutGuestInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    specialRequest?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    source?: EnumReservationSourceFieldUpdateOperationsInput | $Enums.ReservationSource
    rateSnapshot?: IntFieldUpdateOperationsInput | number
    taxRateBp?: IntFieldUpdateOperationsInput | number
    totalAmount?: IntFieldUpdateOperationsInput | number
    holdExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomType?: RoomTypeUpdateOneRequiredWithoutReservationsNestedInput
    room?: RoomUpdateOneWithoutReservationsNestedInput
    history?: ReservationStatusHistoryUpdateManyWithoutReservationNestedInput
    changeLog?: ReservationChangeLogUpdateManyWithoutReservationNestedInput
  }

  export type ReservationUncheckedUpdateWithoutGuestInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    roomTypeId?: StringFieldUpdateOperationsInput | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    specialRequest?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    source?: EnumReservationSourceFieldUpdateOperationsInput | $Enums.ReservationSource
    rateSnapshot?: IntFieldUpdateOperationsInput | number
    taxRateBp?: IntFieldUpdateOperationsInput | number
    totalAmount?: IntFieldUpdateOperationsInput | number
    holdExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    history?: ReservationStatusHistoryUncheckedUpdateManyWithoutReservationNestedInput
    changeLog?: ReservationChangeLogUncheckedUpdateManyWithoutReservationNestedInput
  }

  export type ReservationUncheckedUpdateManyWithoutGuestInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    roomTypeId?: StringFieldUpdateOperationsInput | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    specialRequest?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    source?: EnumReservationSourceFieldUpdateOperationsInput | $Enums.ReservationSource
    rateSnapshot?: IntFieldUpdateOperationsInput | number
    taxRateBp?: IntFieldUpdateOperationsInput | number
    totalAmount?: IntFieldUpdateOperationsInput | number
    holdExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationStatusHistoryCreateManyReservationInput = {
    id?: string
    fromStatus?: string | null
    toStatus: string
    changedBy: string
    reason?: string | null
    changedAt?: Date | string
  }

  export type ReservationChangeLogCreateManyReservationInput = {
    id?: string
    field: string
    oldValue?: string | null
    newValue?: string | null
    changedBy: string
    changedAt?: Date | string
  }

  export type ReservationStatusHistoryUpdateWithoutReservationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableStringFieldUpdateOperationsInput | string | null
    toStatus?: StringFieldUpdateOperationsInput | string
    changedBy?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationStatusHistoryUncheckedUpdateWithoutReservationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableStringFieldUpdateOperationsInput | string | null
    toStatus?: StringFieldUpdateOperationsInput | string
    changedBy?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationStatusHistoryUncheckedUpdateManyWithoutReservationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableStringFieldUpdateOperationsInput | string | null
    toStatus?: StringFieldUpdateOperationsInput | string
    changedBy?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationChangeLogUpdateWithoutReservationInput = {
    id?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    changedBy?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationChangeLogUncheckedUpdateWithoutReservationInput = {
    id?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    changedBy?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationChangeLogUncheckedUpdateManyWithoutReservationInput = {
    id?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    changedBy?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use RoomTypeCountOutputTypeDefaultArgs instead
     */
    export type RoomTypeCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoomTypeCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoomCountOutputTypeDefaultArgs instead
     */
    export type RoomCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoomCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GuestCountOutputTypeDefaultArgs instead
     */
    export type GuestCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GuestCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReservationCountOutputTypeDefaultArgs instead
     */
    export type ReservationCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReservationCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoomTypeDefaultArgs instead
     */
    export type RoomTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoomTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoomTypePhotoDefaultArgs instead
     */
    export type RoomTypePhotoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoomTypePhotoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoomDefaultArgs instead
     */
    export type RoomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoomDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GuestDefaultArgs instead
     */
    export type GuestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GuestDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReservationDefaultArgs instead
     */
    export type ReservationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReservationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReservationStatusHistoryDefaultArgs instead
     */
    export type ReservationStatusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReservationStatusHistoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReservationChangeLogDefaultArgs instead
     */
    export type ReservationChangeLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReservationChangeLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoomStatusHistoryDefaultArgs instead
     */
    export type RoomStatusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoomStatusHistoryDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}