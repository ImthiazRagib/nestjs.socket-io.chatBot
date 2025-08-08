import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';


interface BotChatsCreationAttrs {
  fullName: string;
  email: string;
  phone: number;
  message: string;
}

@Table({
  tableName: 'bot_chats',
  timestamps: true,
  paranoid: true,
})
export class BotChats extends Model<BotChats, BotChatsCreationAttrs> {

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  fullName: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
  })
  phone: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  message: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  status: boolean;
}
