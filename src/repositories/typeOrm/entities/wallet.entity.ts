import { IWallet } from '@/src/domain/entities/interfaces/wallet';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wallet implements IWallet{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;
}