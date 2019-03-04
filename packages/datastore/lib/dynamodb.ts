import * as AWS from "aws-sdk";
import { DataStore } from ".";

export class DynamoDBClient implements DataStore {
  protected readonly tableName: string;
  protected readonly context: AWS.DynamoDB.DocumentClient;

  public constructor(tableName: string, context?: AWS.DynamoDB.DocumentClient) {
    this.tableName = tableName;

    if (!context) {
      context = new AWS.DynamoDB.DocumentClient();
    }
    this.context = context;
  }

  public get(
    params: AWS.DynamoDB.DocumentClient.Key,
    operations?: {
      AttributesToGet?: AWS.DynamoDB.DocumentClient.AttributeNameList;
      ConsistentRead?: AWS.DynamoDB.DocumentClient.ConsistentRead;
      ExpressionAttributeNames?: AWS.DynamoDB.DocumentClient.ExpressionAttributeNameMap;
      ProjectionExpression?: AWS.DynamoDB.DocumentClient.ProjectionExpression;
      ReturnConsumedCapacity?: AWS.DynamoDB.DocumentClient.ReturnConsumedCapacity;
    }
  ) {
    const requestPayload: AWS.DynamoDB.DocumentClient.GetItemInput = Object.assign(
      {},
      {
        TableName: this.tableName,
        Key: params
      },
      operations
    );

    return this.context.get(requestPayload).promise();
  }

  public put(
    params: AWS.DynamoDB.DocumentClient.Key,
    operations?: {
      Expected?: AWS.DynamoDB.DocumentClient.ExpectedAttributeMap;
      ReturnValues?: AWS.DynamoDB.DocumentClient.ReturnValue;
      ReturnConsumedCapacity?: AWS.DynamoDB.DocumentClient.ReturnConsumedCapacity;
      ReturnItemCollectionMetrics?: AWS.DynamoDB.DocumentClient.ReturnItemCollectionMetrics;
      ConditionalOperator?: AWS.DynamoDB.DocumentClient.ConditionalOperator;
      ConditionExpression?: AWS.DynamoDB.DocumentClient.ConditionExpression;
      ExpressionAttributeNames?: AWS.DynamoDB.DocumentClient.ExpressionAttributeNameMap;
      ExpressionAttributeValues?: AWS.DynamoDB.DocumentClient.ExpressionAttributeValueMap;
    }
  ) {
    const requestPayload: AWS.DynamoDB.DocumentClient.PutItemInput = Object.assign(
      {},
      {
        TableName: this.tableName,
        Item: params
      },
      operations
    );

    return this.context.put(requestPayload).promise();
  }

  public delete(
    params: AWS.DynamoDB.DocumentClient.Key,
    operations?: {
      Expected?: AWS.DynamoDB.DocumentClient.ExpectedAttributeMap;
      ConditionalOperator?: AWS.DynamoDB.DocumentClient.ConditionalOperator;
      ReturnValues?: AWS.DynamoDB.DocumentClient.ReturnValue;
      ReturnConsumedCapacity?: AWS.DynamoDB.DocumentClient.ReturnConsumedCapacity;
      ReturnItemCollectionMetrics?: AWS.DynamoDB.DocumentClient.ReturnItemCollectionMetrics;
      ConditionExpression?: AWS.DynamoDB.DocumentClient.ConditionExpression;
      ExpressionAttributeNames?: AWS.DynamoDB.DocumentClient.ExpressionAttributeNameMap;
      ExpressionAttributeValues?: AWS.DynamoDB.DocumentClient.ExpressionAttributeValueMap;
    }
  ) {
    const requestPayload: AWS.DynamoDB.DocumentClient.DeleteItemInput = Object.assign(
      {},
      {
        TableName: this.tableName,
        Key: params
      },
      operations
    );

    return this.context.delete(requestPayload).promise();
  }

  public query(
    params: {
      names: AWS.DynamoDB.DocumentClient.ExpressionAttributeNameMap;
      values: AWS.DynamoDB.DocumentClient.ExpressionAttributeValueMap;
      condition: AWS.DynamoDB.DocumentClient.KeyExpression;
    },
    operations?: {
      IndexName?: AWS.DynamoDB.DocumentClient.IndexName;
      Select?: AWS.DynamoDB.DocumentClient.Select;
      AttributesToGet?: AWS.DynamoDB.DocumentClient.AttributeNameList;
      Limit?: AWS.DynamoDB.DocumentClient.PositiveIntegerObject;
      ConsistentRead?: AWS.DynamoDB.DocumentClient.ConsistentRead;
      KeyConditions?: AWS.DynamoDB.DocumentClient.KeyConditions;
      QueryFilter?: AWS.DynamoDB.DocumentClient.FilterConditionMap;
      ConditionalOperator?: AWS.DynamoDB.DocumentClient.ConditionalOperator;
      ScanIndexForward?: AWS.DynamoDB.DocumentClient.BooleanObject;
      ExclusiveStartKey?: AWS.DynamoDB.DocumentClient.Key;
      ReturnConsumedCapacity?: AWS.DynamoDB.DocumentClient.ReturnConsumedCapacity;
      ProjectionExpression?: AWS.DynamoDB.DocumentClient.ProjectionExpression;
      FilterExpression?: AWS.DynamoDB.DocumentClient.ConditionExpression;
      KeyConditionExpression?: AWS.DynamoDB.DocumentClient.KeyExpression;
      ExpressionAttributeNames?: AWS.DynamoDB.DocumentClient.ExpressionAttributeNameMap;
      ExpressionAttributeValues?: AWS.DynamoDB.DocumentClient.ExpressionAttributeValueMap;
    }
  ) {
    const requestPayload: AWS.DynamoDB.DocumentClient.QueryInput = Object.assign(
      {},
      { TableName: this.tableName },
      {
        ExpressionAttributeNames: params.names,
        ExpressionAttributeValues: params.values,
        KeyConditionExpression: params.condition
      },
      operations
    );

    return this.context.query(requestPayload).promise();
  }

  public scan(
    params: {
      filter: AWS.DynamoDB.DocumentClient.ConditionExpression;
      names: AWS.DynamoDB.DocumentClient.ExpressionAttributeNameMap;
      values: AWS.DynamoDB.DocumentClient.ExpressionAttributeValueMap;
    },
    operations?: {
      IndexName?: AWS.DynamoDB.DocumentClient.IndexName;
      AttributesToGet?: AWS.DynamoDB.DocumentClient.AttributeNameList;
      Limit?: AWS.DynamoDB.DocumentClient.PositiveIntegerObject;
      Select?: AWS.DynamoDB.DocumentClient.Select;
      ScanFilter?: AWS.DynamoDB.DocumentClient.FilterConditionMap;
      ConditionalOperator?: AWS.DynamoDB.DocumentClient.ConditionalOperator;
      ExclusiveStartKey?: AWS.DynamoDB.DocumentClient.Key;
      ReturnConsumedCapacity?: AWS.DynamoDB.DocumentClient.ReturnConsumedCapacity;
      TotalSegments?: AWS.DynamoDB.DocumentClient.ScanTotalSegments;
      Segment?: AWS.DynamoDB.DocumentClient.ScanSegment;
      ProjectionExpression?: AWS.DynamoDB.DocumentClient.ProjectionExpression;
      ConsistentRead?: AWS.DynamoDB.DocumentClient.ConsistentRead;
    }
  ) {
    const requestPayload: AWS.DynamoDB.DocumentClient.ScanInput = Object.assign(
      {},
      { TableName: this.tableName },
      {
        FilterExpression: params.filter,
        ExpressionAttributeNames: params.names,
        ExpressionAttributeValues: params.values
      },
      operations
    );

    return this.context.scan(requestPayload).promise();
  }
}
