import { IWallet } from '@/src/wallet/interfaces/wallet.interface';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wallet implements IWallet{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;
}