import React from 'react';
import { useQuery, useMutation } from 'react-query';

import { apiGETQuery, apiPOSTMutate } from '../../api/queryLookup';
import { TweetCreate } from './create';
import { TweetList } from './list';
import { TweetDetail } from './detail';

export const TweetListComponent = (props) => {
    const { requestUserId } = props;
    const { data : tweetList, status, refetch } = useQuery(['tweetListState', 'tweets/'], apiGETQuery);

    const [create_mutate] = useMutation(apiPOSTMutate, {
        onSuccess : refetch
    });

    const handleTweetCreate = async (content) => {
        const endpoint = `tweets/create/`;
        const newTweet = {
            'content' : content
        }
        try {
            await create_mutate({ endpoint, payload: newTweet })
        } catch (error) {
            console.log('tweet create error');
        }
    }


    if(status==="loading"){
        return (
            <div className="text-center">
                <h1>Loading</h1>
            </div>
        )
    }

    if(status==="error"){
        return (
            <div className="text-center">
                <h1>Error. Try Again</h1>
            </div>
        )
    }

    if(status==="success"){
        if(tweetList.error_message==='not found'){
            return (
                <div className="text-center">
                    <h1>Error 404 : Not Found</h1>
                </div>
            )
        }
        return (
            <div className="col-10 col-md-8 col-lg-6 mx-auto">
                <>
                    {/* form to create tweet */}
                    { 
                        (requestUserId) && 
                        <TweetCreate handleTweetCreate={handleTweetCreate}/>
                    }

                </>
                <>
                    <TweetList tweetList={tweetList} refetch={refetch} {...props}/>
                </>
            </div>
        )
    }
}

export const TweetDetailComponent = (props) => {
    return (
        <div className="col-10 col-md-8 col-lg-6 mx-auto">
            <TweetDetail {...props}/>    
        </div>
    )
}