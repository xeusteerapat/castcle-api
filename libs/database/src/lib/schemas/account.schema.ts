/*
 * Copyright (c) 2021, Castcle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 3 only, as
 * published by the Free Software Foundation.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License
 * version 3 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 3 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Castcle, 22 Phet Kasem 47/2 Alley, Bang Khae, Bangkok,
 * Thailand 10160, or visit www.castcle.com if you need additional information
 * or have any questions.
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Model, model } from 'mongoose';
import { TimestampBase } from './base.timestamp.schema';
import {
  AccountActivationDocument,
  AccountActivationSchema
} from './accountActivation.schema';
import { Environment as env } from '@castcle-api/environments';
import { CredentialDocument, CredentialSchema } from './credential.schema';
export type AccountDocument = Account & IAccount;

export enum AccountRole {
  Member = 'member',
  Guest = 'guest'
}

@Schema({ timestamps: true })
export class Account extends TimestampBase {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  activateDate: Date;

  @Prop({ required: true })
  isGuest: boolean;

  @Prop({ required: true, type: Object })
  preferences: {
    langagues: string[];
  };

  @Prop({ type: Object })
  mobile: {
    countryCode: string;
    number: string;
  };
}
export const AccountSchema = SchemaFactory.createForClass(Account);

export interface IAccount extends Document {
  verifyPassword(password: string): boolean;
  getOneCredential(): Promise<CredentialDocument>;
}
AccountSchema.methods.verifyPassword = (password: string) => {
  return password === 'testpassword';
};
AccountSchema.methods.getOneCredential =
  function (): Promise<CredentialDocument> {
    const credentialModel: Model<CredentialDocument> = model(
      'Credential',
      CredentialSchema
    );
    return credentialModel.findOne({ account: this._id }).exec();
  };

export interface AccountModel extends mongoose.Model<AccountDocument> {
  createAccountActivation(
    accountActivationModel: Model<AccountActivationDocument>,
    accountDocument: AccountDocument,
    type: 'email' | 'phone'
  ): Promise<AccountActivationDocument>;
}

AccountSchema.statics.createAccountActivation = (
  accountActivationModel: Model<AccountActivationDocument>,
  accountDocument: AccountDocument,
  type: 'email' | 'phone'
) => {
  const now = new Date();
  const verifyExpireDate = new Date(now.getTime() + env.jwt_verify_expires_in);
  const payload = {
    id: accountDocument._id,
    verifyExpireDate: verifyExpireDate
  };
  const token = `${JSON.stringify(payload)}`; //temporary
  const accountActivation = new accountActivationModel({
    account: accountDocument._id,
    type: type,
    verifyToken: token,
    verifyExpireDate: verifyExpireDate
  });
  return accountActivation.save();
};
