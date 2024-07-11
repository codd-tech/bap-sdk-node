# Webhooks

Webhooks are a powerful feature of the service that enable users to receive real-time notifications about various ad lifecycle events directly to their desired endpoints.

## Handling Webhook Notifications

When an ad lifecycle event occurs, server will send an HTTP POST request to the specified webhook endpoint with relevant data in the request body. Your system should handle these requests accordingly, processing the information and performing any necessary actions.

### Webhook Payload

#### Ad Displayed

```http request
POST https://httpbin.org/post
Content-Type: application/json
Accept: application/json

{
    "id": "UUIDv4",
    "type": "ad.displayed",
    "timestamp": "2023-10-22T14:30:00Z",
    "data": {
        "ad_id": "111",
        "chat_id": "123123",
        "user_id": "123123"
    }
}
```

#### Ad Updated

The advertisement has been updated in accordance with the timer.

```http request
POST https://httpbin.org/post
Content-Type: application/json
Accept: application/json

{
    "id": "UUIDv4",
    "type": "ad.updated",
    "timestamp": "2023-10-22T14:30:00Z",
    "data": {
        "ad_id": "111",
        "chat_id": "123123",
        "user_id": "123123"
    }
}
```

#### Ad Finalized

The advertisement timer has finished, and the user can now skip the ad.

```http request
POST https://httpbin.org/post
Content-Type: application/json
Accept: application/json

{
    "id": "UUIDv4",
    "type": "ad.finalized",
    "timestamp": "2023-10-22T14:30:00Z",
    "data": {
        "ad_id": "111",
        "chat_id": "123123",
        "user_id": "123123"
    }
}
```

#### Ad Removed

The advertisement has been removed from the chat.

```http request
POST https://httpbin.org/post
Content-Type: application/json
Accept: application/json

{
    "id": "UUIDv4",
    "type": "ad.removed",
    "timestamp": "2023-10-22T14:30:00Z",
    "data": {
        "chat_id": "123123",
        "user_id": "123123"
    }
}
```
