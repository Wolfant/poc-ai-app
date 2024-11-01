import React from "react";
import { PropsWithChildren, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";

export function AiQuoteUser({ children, userData, quote }:
    PropsWithChildren & { userData: any, quote: any }) {
    return (
        <Card className="p-5 rounded-lg max-w-[360px] m-3">
            <Box className="flex-row">
                <Avatar className="mr-3">
                    <AvatarFallbackText>RR</AvatarFallbackText>
                    <AvatarImage
                        source={{
                            uri: userData.picture,
                        }}
                    />
                </Avatar>
                <VStack>
                    <Heading size="sm" className="mb-1">
                        {userData?.name}
                    </Heading>
                    <Text size="sm">{userData.email}</Text>
                </VStack>
            </Box>
            <Text className="text-sm font-normal mb-2 text-typography-700">
                Last Login {userData.updatedAt}
            </Text>
            <VStack className="mb-6">
                <Heading size="md" className="mb-4">
                { quote?.title }
                </Heading>
                <Text size="sm">
                    { quote?.message }
                </Text>
            </VStack>
        </Card>
    );
}
