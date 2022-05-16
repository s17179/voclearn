export class Partition {
  constructor(private size: number) {
    this.assertSizeIsPositive();
  }

  static empty(): Partition {
    return new Partition(0);
  }

  increase(): Partition {
    return new Partition(this.size + 1);
  }

  decrease(): Partition {
    return new Partition(this.size - 1);
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  getSize(): number {
    return this.size;
  }

  private assertSizeIsPositive(): void {
    if (this.size < 0) {
      throw new Error('Partition size must be positive');
    }
  }
}
