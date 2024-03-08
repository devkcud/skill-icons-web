class LocalStorage {
  /**
   * Constructs a LocalStorage instance with a specified key.
   *
   * @param {string} key - The key to be used for local storage operations.
   */
  constructor(private key: string) {}

  /**
   * Retrieves the value associated with the instance's key from local storage.
   * If the key does not exist, it returns the provided default value or null.
   *
   * @param {string | null} [defaultValue=null] - The default value to return if the key does not exist.
   * @returns {string | null} The value associated with the key or the default value.
   */
  public get(defaultValue: string | null = null): string | null {
    return LocalStorage.get(this.key) || defaultValue;
  }

  /**
   * Sets the value for the instance's key in local storage.
   *
   * @param {string} value - The value to be stored.
   */
  public set(value: string): void {
    LocalStorage.set(this.key, value);
  }

  /**
   * Removes the value associated with the instance's key from local storage.
   */
  public remove(): void {
    LocalStorage.remove(this.key);
  }

  /**
   * Retrieves the value associated with a specified key from local storage.
   * If the key does not exist, it returns the provided default value or null.
   *
   * @param {string} key - The key to retrieve the value for.
   * @param {string | null} [defaultValue=null] - The default value to return if the key does not exist.
   * @returns {string | null} The value associated with the key or the default value.
   */
  public static get(key: string, defaultValue: string | null = null): string | null {
    return localStorage.getItem(key) || defaultValue;
  }

  /**
   * Sets the value for a specified key in local storage.
   *
   * @param {string} key - The key to set the value for.
   * @param {string} value - The value to be stored.
   */
  public static set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  /**
   * Removes the value associated with a specified key from local storage.
   *
   * @param {string} key - The key to remove the value for.
   */
  public static remove(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Retrieves all entries in the local storage as an array of key-value pairs.
   *
   * @returns {Array<{key: string; value: string}>} An array of objects with 'key' and 'value' properties.
   */
  public static entries(): { key: string; value: string }[] {
    return Object.entries(localStorage).map(([key, value]) => ({ key, value }));
  }

  /**
   * Clears all entries in the local storage.
   */
  public static clear(): void {
    LocalStorage.entries().forEach(({ key }) => LocalStorage.remove(key));
  }
}

export default LocalStorage;
